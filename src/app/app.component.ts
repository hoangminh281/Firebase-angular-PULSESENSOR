import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetHeartBeatService } from './get-heart-beat.service';

import { Observable } from 'rxjs/Observable';

import { NgxChartsModule, count } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  temp: any;
  count = -1;
  ThresHold = 0;
  ison: any;
  BPM: any;

  multi = [];
  series = [];

  // chart
  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Heart Beat';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  onSelect(event) {
    console.log(event);
  }


  constructor(private _heatBeat: GetHeartBeatService) {
    this._heatBeat.getHeatBeat().subscribe(items => {
      // console.log(Object.values(items)[0]);
      // this.temp = items;
      this.temp = Object.values(items);
      this.data(items);
    });

    this._heatBeat.getisOn().subscribe(data => {
      if (data === 0) {
        this.ison = false;
      } else {
        this.ison = true;
      }
    });

    this._heatBeat.getBPM().subscribe(data => {
      this.BPM = data;
    });
  }

  data(items) {
    console.log(items);
    // this.multi = [{
    //   'name': 'abc',
    //   'series': [
    //     {
    //       'name': '2010',
    //       'value': 5
    //     },
    //     {
    //       'name': '2011',
    //       'value': 15
    //     }
    //   ]
    // }];

    for (const i in items) {
      if (i) {
        this.count++;
        console.log(this.count);
        console.log('key ' + i);
        console.log('value ' + Object.values(items)[this.count]);
        this.series[this.count] = {
          // 'name': i + '',
          // 'value': items[i]
          'name': i,
          'value': Object.values(items)[this.count]
        };
      }
    }

    this.multi = [{
      'name': 'heart-beat',
      'series': this.series
    }];



  }

  sliderChange(val) {
    console.log('thre ' + val.target.value);
    // Use Ajax post to send the adjusted value to PHP or MySQL storage
    this.ThresHold = val.target.value;
  }

  set() {
    this._heatBeat.setDataThresHold(this.ThresHold);
    alert('Set ThresHold succsessfully!');
  }

  setOn() {
    this._heatBeat.setOn();
    alert('SET ON SUCCESS!');
  }

  setOff() {
    this._heatBeat.setOff();
    alert('SET OFF SUCCESS!');
  }

}
