#include <DallasTemperature.h>
#include <OneWire.h>
#include <SoftwareSerial.h>
#define ONE_WIRE_BUS 2

SoftwareSerial mySerial(3, 4); //Rx = 3, Tx = 4 trans to ESP
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature temp_buff(&oneWire);

const int gasPin = A0;
const String KEY_GAS = "GASSENSOR";
const String KEY_TEMP = "TEMPSENSOR";
int gasFigure;
double tempFigure;

void setup() {
  Serial.begin(115200);
  mySerial.begin(115200);
  temp_buff.begin();
}

void loop() {
  //nhan va gui GAS cho ESP
  gasFigure = analogRead(gasPin);
  Serial.print("SendESP_GAS: ");
  Serial.println(gasFigure);
  sendESP((String)gasFigure, KEY_GAS);

  //nhan va gui TEMPERATURE cho ESP
  temp_buff.requestTemperatures();
  tempFigure = temp_buff.getTempCByIndex(0);
  Serial.print("SendESP_TEMP: ");
  Serial.println(tempFigure);
  if (tempFigure != -127) {
    sendESP((String)tempFigure, KEY_TEMP);
  }

  //nhan du lieu tu ESP
  String data = receiveESP();
  if (data != "") {
    Serial.print("ReceiveESP: ");
    Serial.print(data);
  }
}

void sendESP(String data, String KEY) {
  mySerial.println(KEY + "_" + data);
  delay(1000);
}

String receiveESP() {
  String buff = "";
  if (mySerial.available()) {
    while (mySerial.available()) {
      char data = (char)mySerial.read();
      buff += data;
    }
  }
  return buff;
}

