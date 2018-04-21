import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetHeartBeatService {
  // heatBeatList: Observable<any>[];
  constructor(private firebasedb: AngularFireDatabase) {}

  getHeatBeat() {
    // 1 value
    // this.heatBeatList = this.firebasedb.object('PULSESENSOR').valueChanges();
    return this.firebasedb.object('PURSESENSOR').valueChanges();

    // array value
    // return this.firebasedb.list('/PULSESENSOR').valueChanges();
  }

  setDataThresHold(data: any) {
    return this.firebasedb.object('/').update({ThresHold: data});

  }

  getisOn() {
    return this.firebasedb.object('isOn').valueChanges();
  }

  setOn() {
    return this.firebasedb.list('/').set('isOn', 1);
  }

  setOff() {
    return this.firebasedb.list('/').set('isOn', 0);
  }

  getBPM() {
    return this.firebasedb.object('BPM').valueChanges();
  }
}
