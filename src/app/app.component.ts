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

  heartBeatData = [];
  multi = [];

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
      // console.log(JSON.stringify(items[0]));
      // this.data(items);
    });
  }

  data(items) {
    // this.heartBeatCount = [];
    this.heartBeatData = [];
    const multi = [{
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        }
      ]
    },
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 2200000
        },
        {
          'name': '2011',
          'value': 5540000
        }
      ]
    }
  ];
    // for (const i in items) {
    //   // const single = {
    //   //   name: items[i].key,
    //   //   value: items[i].payload
    //   // };

    //   const single = {
    //     name: items[i].key,
    //     series: [
    //       {
    //         name: '2010',
    //         value: items[i].payload - 30
    //       },
    //       {
    //         name: '2011',
    //         value: items[i].payload
    //       }
    //     ]
    //   }
    //  // this.heartBeatData.push(single);
    //   // this.multi.push(single);
    // }
    Object.assign(this, {multi});
    console.log(JSON.stringify(this.heartBeatData[0]));
    console.log(JSON.stringify(this.multi[0]));
  }

}
