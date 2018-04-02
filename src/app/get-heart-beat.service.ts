import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetHeartBeatService {
  heatBeatList: Observable<any>[];
  constructor(private firebasedb: AngularFireDatabase) {}

  getHeatBeat() {
    // 1 value
    // this.heatBeatList = this.firebasedb.object('PULSESENSOR').valueChanges();
    // return this.heatBeatList;

    // array value
    return this.firebasedb.list('/PULSESENSOR').valueChanges();
  }
}
