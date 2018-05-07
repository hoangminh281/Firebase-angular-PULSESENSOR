//ESP8266 Wifi shield v1 dùng board NodeMCU 1.0
//Upload speed 115200

#include <NTPtimeESP.h>       //Thư viện kết nối service thời giàn
#include <ESP8266WiFi.h>      //Thư viện cho esp8266 wifi shield
#include <FirebaseArduino.h>  //Thư viện giao tiếp với Firebase

#define FIREBASE_HOST "qlcn-3d083.firebaseio.com"                 //Đường dẫn CSDL Firebase
#define FIREBASE_AUTH "DqRKMGNqF5HjBQSVqDBN7FDFSA4OrcPBaGQL82RT"  //Token dùng cho việc xác thực
#define WIFI_SSID "VIETTEL_GPON"                //Tên wifi dùng để kết nối
#define WIFI_PASSWORD "hoithangduy"             //Mật khẩu wifi
#define SAVE_PURSE_KEY "PURSESENSOR"            //Key lưu vĩnh viễn giá trị BPM trên Firebase
#define SET_PURSE_KEY "BPM"                     //Key lưu tạm thời giá trị BPM trên Firebase
#define THRESHOLD_KEY "ThresHold"               //Key dùng để thiết lập ngưỡng xác định interbeat interval
#define ISON_KEY "isOn"                         //Key bật/tắt việc có lưu vĩnh viễn giá trị BPM hay không

NTPtime NTPch("ch.pool.ntp.org");               //Server NTP
strDateTime dateTime;                           //Struct dateTime dùng để lấy thời gian thực làm time vẽ biểu đồ
int isOn;                                       //Biến bật/tắt việc có lưu vĩnh viễn giá trị BPM hay không

void setup() {
  Serial.begin(115200);                         //Bắt đầu Serial kết nối Arduino r3 mức 115200
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);         //Khởi chạy kết nối wifi
  Serial.print("Connecting");                   //In trạng thái đang kết nối
  while (WiFi.status() != WL_CONNECTED) {       //Khi trạng thái chưa được kết nối in '.' và delay 500
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");                  //In trạng thái đã kết nối
  Serial.println(WiFi.localIP());               //In Ip local được kết nối
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); //Khởi chạy kết nối tới Firebase dựa vào đường dẫn host và token xác thực
  isOn = 0;                                     //khởi tạo isOn đang tắt
}

void loop() {  
  String data = receiveUNO();                       //Hàm nhận dữ liệu sensor được gửi từ Arduino R3
  if (data!="") {                                   //Kiểm tra dữ liệu có rỗng hay không
    dateTime = NTPch.getNTPtime(7.0, 0);            //Lấy thời gian thực: tham số đầu là Timezone (Múi giờ VN là 7)
                                                    //Tham số sau là DayLightSaving: 1 với thời gian, 2 là thời gian US (VN không sử dụng)
    isOn = receiveFirebase(ISON_KEY);               //Nhận dữ liệu isOn từ Firebase
    if (isOn==1) {                                  //Nếu isOn là đang bật thì lưu BPM lên Firebase
      saveFirebase(SAVE_PURSE_KEY, data, dateTime); //Hàm gửi dữ liệu tới Firebase gồm data và thời gian thực
    }
    setFirebase(SET_PURSE_KEY, data);               //Lưu tạm thời giá trị BPM trên Firebase
  }
  
  sendUNO((String)receiveFirebase(THRESHOLD_KEY));//Nhận dữ liệu từ Firebase với key là "ThresHold" và gửi sang cho Arduino R3 để set ngưỡng xác định nhịp tim
}

void saveFirebase(String key, String data, strDateTime dateTime) {  //Hàm gửi dữ liệu cho Firebase
  if (!dateTime.valid) return;                                      //Kiểm tra thời gian thực đúng trước khi tiến hành gửi
  String st = (String)dateTime.day + "_" + (String)dateTime.month + "_" + (String)dateTime.year + " " + (String)dateTime.hour + ":" + (String)dateTime.minute + ":" + (String)dateTime.second; //Tạo chuỗi thời gian thực để gửi
  Firebase.setInt(key + "/" + st, data.toInt());  //Gửi lên Firebase với tham số đầu là đường dẫn để lưu, hàm này ghi đè dữ liệu nếu trùng dữ liệu trên Firebase
}

void setFirebase(String key, String data) {                         //Hàm lưu tạm thời giá trị BPM trên Firebase
  Firebase.setInt(key, data.toInt());                               //Ghi đè giá trị BPM lên key "BPM" trên Firebase
}

int receiveFirebase(String key) {                                   //Nhận dữ liệu từ Firebase dùng keyword để xác định dữ liệu cần lấy
  return Firebase.getInt(key);                                      //Nhận về kiểu Int và return ra
}

void sendUNO(String data) {                                         //Hàm gửi dữ liệu sang Arduino R3
  Serial.println(data);                                             //Gửi và delay 1s
  delay(1000);
}

String receiveUNO() {                                               //Hàm nhận dữ liệu từ Arduino R3
  String buff = "";                                                 //Tạo biến chuỗi đệm để nhận từng kí tự thêm vào
  if (Serial.available()) {                                         //Kiểm tra cổng kết nối sẵn sàng
    while(Serial.available()) {                                     //Lặp đến khi cổng kết nối hết nhận được dữ liệu
      char data = (char)Serial.read();                              //Đọc kí tự từ cổng kết nối và ép sang kiểu char
      buff += data;                                                 //Lưu vào biến String đệm
    }   
  }
  return buff;                                                      //Trả kết quả
}

