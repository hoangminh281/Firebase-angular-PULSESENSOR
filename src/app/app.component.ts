import { Component, OnInit } from '@angular/core';
import { GetHeartBeatService } from './get-heart-beat.service';

import { Observable } from 'rxjs/Observable';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  temp: any;

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
      console.log(items);
      this.temp = items;
      this.data(items);
    });
  }

  data(items) {
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
        this.series[i] = {
          'name': i + '',
          'value': items[i]
        };
      }
    }

    this.multi = [{
      'name': 'heart-beat',
      'series': this.series
    }];




  }

}
