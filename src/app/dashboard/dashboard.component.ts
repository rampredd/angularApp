import { StateDataService } from './../services/state-date.service';
import { District } from './../entities/district';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { DISTRICTS, STATES } from '../mock-data/mock-data';
import { DashboardService } from '../services/dashboard.services';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  @Input() states;
  districts = DISTRICTS;
  setScoreForm: FormGroup;
  errormsg;
  seletedState;
  allDistrictInUp: any;
  formMetaData = [];
  allStateName = [];
  maxDistrictName: string;
  minDistrictName: string;
  maxDistData = [];
  minDistData = [];
  highestScore: any;
  lowesetScore: any;
  barChartMaxData: any;
  maxStateModal: boolean;
  minStateModal: boolean;
  getScoreFromModalMax: any;
  getScoreFromModalMin: any;
  allDistrictData: any;
  @ViewChild('maxDistrictChart')
  chart1: BaseChartDirective;

  @ViewChild('minDistrictChart')
  chart2: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    type: 'horizontalBar',
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  public lineChartColors: Array<any> = [
    'rgb(0, 184, 255)',
    '#ff2a2a',
    'rgb(0, 194, 232)',
    'rgb(225, 128, 0)',
    'rgb(63, 72, 204)',
    'rgb(39, 216, 139)'
  ];

  public pieChartColors: Array<any> = [{
    backgroundColor: [
      'rgb(0, 184, 255)',
      '#ff2a2a',
      'rgb(0, 194, 232)',
      'rgb(225, 128, 0)',
      'rgb(63, 72, 204)',
      'rgb(39, 216, 139)'
    ]
  }];

  public barChartLabels: string[] = ['General', 'Training', 'Equip & D', 'Infra', 'Manpower', 'L&D'];
  public barChartType = 'horizontalBar';
  public barChartLegend = false;

  public pieChartLabels: string[] = ['General', 'Trainings', 'Equip & D', 'Infra', 'Manpower', 'L&D'];
  pieChartDataDistrict1: number[] = [];
  pieChartDataDistrict2: number[] = [];
  public pieChartType: string = 'pie';
  seleteddis1 = 'District 1';
  seleteddis2 = 'District 2';

  generalData: any = [];
  getAllStatsData: any;
  barChartMinData: { label: string; data: any[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number; }[];
  districtsforParticularState: string[] = [];
  state1: any;
  state2: any;


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  clickedMarker(event) {
    console.log(event);
  }


  constructor(private fb: FormBuilder, private dashboardService: DashboardService, private stateDataService: StateDataService) { }

  ngOnInit() {
    this.appIntialize();
    this.getFormMetaData();
    this.setCreateForm();
    this.getAlldistrictData();
    this.getAllDistrictsData();
  }

  setCreateForm() {
    this.setScoreForm = this.fb.group({
      General: [16.67, Validators.required],
      Training: [16.67, Validators.required],
      Equip: [16.67, Validators.required],
      Infra: [16.67, Validators.required],
      Manpower: [16.67, Validators.required],
      LD: [16.67, Validators.required],
    });
  }

  submitForm() {
    const Generalvalue = this.setScoreForm.controls.General.value;
    const Training = this.setScoreForm.controls.Training.value;
    const Equip = this.setScoreForm.controls.Equip.value;
    const Infra = this.setScoreForm.controls.Infra.value;
    const Manpower = this.setScoreForm.controls.Manpower.value;
    const ldvalue = this.setScoreForm.controls.LD.value;

    const totalScore: Number = +(Generalvalue + Training + Equip + Infra + Manpower + ldvalue).toFixed(0);
    if (totalScore !== 100) {
      console.log(totalScore, 'totalScore');
      this.errormsg = true;
      return false;
    }
    if (this.maxStateModal) {
      this.getScoreFromModalMax = this.setScoreForm.value;
      const statValues: any = Object.values(this.getScoreFromModalMax);
      console.log(statValues, 'statValues');
      const res = this.maxDistData.map((x, index) => {
        return ((statValues[index] / 100) * x).toFixed(0);
      });
      this.maxDistData.length = 0;
      res.map(x => {
        this.maxDistData.push(Number(x));
      });
      console.log(this.maxDistData, 'res');
      this.highestScore = +(this.maxDistData).reduce((a, b) => a + b, 0);

      console.log(this.highestScore, ' this.highestScore');

      this.getbarChartMaxData();

      console.log(this.getScoreFromModalMax, 'formvalmax');
      this.maxStateModal = false;
      this.clearSetValuesForm();
    }
    if (this.minStateModal) {
      this.getScoreFromModalMin = this.setScoreForm.value;
      const statValues: any = Object.values(this.getScoreFromModalMin);
      console.log(statValues, 'statValues');
      const res = this.minDistData.map((x, index) => {
        return ((statValues[index] / 100) * x).toFixed(0);
      });
      this.minDistData.length = 0;
      res.map(x => {
        this.minDistData.push(Number(x));
      });
      this.lowesetScore = this.minDistData.reduce((a, b) => a + b, 0);
      console.log(this.minDistData, 'res');
      this.getbarChartMinData();

      console.log(this.getScoreFromModalMin, 'formvalmax');
      this.minStateModal = false;
      this.clearSetValuesForm();
    }
  }

  clearSetValuesForm() {
    this.setScoreForm.patchValue({
      General: 16.67,
      Training: 16.67,
      Equip: 16.67,
      Infra: 16.67,
      Manpower: 16.67,
      LD: 16.67,
    });
  }

  setScoreForMaxState(state) {
    if (state === 'maxstate') {
      //alert('max');
      this.maxStateModal = true;
    }
    if (state === 'minstate') {
      //alert('minx');
      this.minStateModal = true;
    }
  }

  getAlldistrictData() {
    this.dashboardService.getAllDistrictsStats().subscribe(data => {
      this.allDistrictInUp = data;
      Object.keys(this.allDistrictInUp);
      let districtArray = [];
      for (const [key, value] of Object.entries(this.allDistrictInUp)) {
        districtArray[key] = Object.keys(this.allDistrictInUp[key]);
      }
      this.allStateName = Object.keys(districtArray);
      console.log(this.allStateName, 'allDistrictInUp');
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }

  appIntialize() {
    this.seletedState = 'Assam';
    this.maxStateModal = false;
    this.minStateModal = false;
  }

  getFormMetaData() {
    this.dashboardService.getAFormMetaData().subscribe(data => {
      this.formMetaData = data;
      console.log(this.formMetaData['servicePoint'], 'formMetaData');
      this.getAllData();
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }

  getAllData() {
    this.dashboardService.getAllData(this.seletedState, this.formMetaData['servicePoint']).subscribe(data => {
      console.log('all district of state data ', data);
      this.getAllStatsData = this.processDistrictData(data);
      console.log(this.getAllStatsData, 'getAllStatsData');
      this.stateDataService.setStateData(this.getAllStatsData);
      this.districtsforParticularState = Object.keys(this.getAllStatsData);
      this.getMaxMinDistricts();
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }

  processDistrictData(data: [any]) {
    const allDistrictData = [];
    if (data) {
      data.map(item => {
        //console.log('processing stat item', item);
        item.map(stat => {
          //console.log('processing stat stat', stat);
          if (!allDistrictData[stat['_id']]) {
            allDistrictData[stat['_id']] = {};
          }
          const cat = this.getCategory(stat);
          //console.log('got cat', cat, stat[cat]);
          allDistrictData[stat['_id']][cat] = stat[cat];
        });
      });
    }
    console.log('processed district data: ', allDistrictData);
    return allDistrictData;
  }

  getCategory(stat: any) {
    const cats = ["General", "Training", "EquipAndD", "Infra", "Manpower", "LAndD"];
    for (const cat of cats) {
      const statKeys = Object.keys(stat);
      const vals = statKeys.filter(val => {
        return val === cat;
      });
      if (vals.length > 0) {
        return cat;
      }
    }
  }

  getMaxMinDistricts() {
    const totals = {};
    for (const district of Object.keys(this.getAllStatsData)) {
      const total = Object.values(this.getAllStatsData[district])
        .reduce((a: number, b: number) => a + b, 0);
      totals[district] = total;
    }

    let max = { district: "", total: 0 };
    let min = { district: "", total: 10000 };
    for (const dist of Object.keys(totals)) {
      if (totals[dist] > max.total) {
        max.district = dist;
        max.total = totals[dist];
      }
      if (totals[dist] < min.total) {
        min.district = dist;
        min.total = totals[dist];
      }
    }

    this.maxDistrictName = max.district;
    this.minDistrictName = min.district;
    console.log("max district name", this.maxDistrictName);
    console.log("min district name", this.minDistrictName);
    if (this.maxDistrictName && this.minDistrictName)
      this.refreshDistrictCharts();
    else {
      this.getbarChartMaxData(true);
      this.getbarChartMinData(true);
      this.highestScore = 0;
      this.lowesetScore = 0;
      this.maxDistrictName = "No data";
      this.minDistrictName = "No data";
    }
    // this.getGeneralData(this.seletedState, 'General');
  }

  refreshDistrictCharts() {
    // refresh max and min districts chart data
    this.maxDistData = this.getDistDataValues(this.getAllStatsData[this.maxDistrictName]);
    this.minDistData = this.getDistDataValues(this.getAllStatsData[this.minDistrictName]);
    console.log('max district', this.maxDistData);
    console.log('min district', this.minDistData);
    this.maxDistData = this.maxDistData.map((data) => {
      return Number(data.toFixed(0));
    });
    this.minDistData = this.minDistData.map((data) => {
      return Number(data.toFixed(0));
    });
    console.log(this.getAllStatsData[this.maxDistrictName], 'this.getAllStatsData[this.maxDistrictName]');
    this.getbarChartMaxData();
    this.getbarChartMinData();
    this.highestScore = this.maxDistData.reduce((a, b) => a + b, 0);
    this.lowesetScore = this.minDistData.reduce((a, b) => a + b, 0);
  }

  getDistDataValues(distData) {
    let values = [];
    const cats = ["General", "Training", "EquipAndD", "Infra", "Manpower", "LAndD"];
    for (const cat of cats) {
      values.push(distData[cat] ? distData[cat] : 0);
    }
    return values;
  }

  // getGeneralData(state, tab) {
  //   this.dashboardService.getGeneralData(state, tab).subscribe(data => {
  //     this.generalData = data;
  //     console.log(this.generalData, 'generalData');
  //   },
  //     (error) => {
  //       console.log(`bad req from api ${error}`);
  //     }
  //   );
  // }

  getAllDistrictsData() {
    this.dashboardService.getAllDistrictsData().subscribe(data => {
      this.allDistrictData = data;
      const allDistrictDataKeys = Object.keys(this.allDistrictData);
      const allDistrictDataValues = Object.values(this.allDistrictData);
      allDistrictDataValues.map((item, index) => {
        item['dis'] = allDistrictDataKeys[index];
        console.log(item, 'res');
      });
      this.generalData = allDistrictDataValues;
      this.generalData.sort((a, b) => {
        const aDiff = a.CurMonth - a.PrevMonth;
        const bDiff = b.CurMonth - b.PrevMonth;
        if (aDiff < bDiff) return 1;
        else if (aDiff > bDiff) return -1;
        else return 0;
      });
      console.log(this.generalData, 'allDistrictData');
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }



  onstateChange(state) {
    this.seletedState = state;
    this.seleteddis1 = 'District 1';
    this.seleteddis2 = 'District 2';
    // this.districtsforParticularState.length = 0;
    this.pieChartDataDistrict1.length = 0;
    this.pieChartDataDistrict2.length = 0;
    this.getAllData();

  }

  getbarChartMinData(isEmpty = false) {
    this.barChartMinData = [
      {
        label: '# Score',
        data: isEmpty ? [] : this.minDistData,
        backgroundColor: [
          'rgb(0, 194, 232)',
          'rgb(225, 0, 44)',
          'rgb(179, 0, 62)',
          'rgb(14, 112, 150)',
          'rgb(255, 193, 0)',
          'rgb(2, 188, 83)'
        ],
        borderColor: [
          'rgba(0, 184, 255, 0)',
          'rgba(225, 42, 42, 0)',
          'rgba(0, 194, 232, 0)',
          'rgba(225, 128, 0, 0)',
          'rgba(63, 72, 204, 0)',
          'rgba(39, 216, 139, 0)'
        ],
        borderWidth: 0
      }
    ];
  }

  getbarChartMaxData(isEmpty = false) {
    this.barChartMaxData = [
      {
        label: '# Score',
        data: isEmpty ? [] : this.maxDistData,
        backgroundColor: [
          'rgb(0, 194, 232)',
          'rgb(225, 0, 44)',
          'rgb(179, 0, 62)',
          'rgb(14, 112, 150)',
          'rgb(255, 193, 0)',
          'rgb(2, 188, 83)'
        ],
        borderColor: [
          'rgba(0, 184, 255, 0)',
          'rgba(225, 42, 42, 0)',
          'rgba(0, 194, 232, 0)',
          'rgba(225, 128, 0, 0)',
          'rgba(63, 72, 204, 0)',
          'rgba(39, 216, 139, 0)'
        ],
        borderWidth: 0
      }
    ];
  }

  getDistrict1(state) {
    this.state1 = state.target.value;
  }

  getDistrict2(state) {
    this.state2 = state.target.value;
  }

  campareTwoDistricts() {
    const valid = this.state1 && this.state1;
    if (!valid) {
      alert('Please Select The District');
      return false;
    }
    this.dashboardService.campareTwoDistricts(this.seletedState, this.state1, this.seletedState, this.state2).subscribe(data => {
      this.campareDistrictData = data;
      console.log('compare data as recieved', data);
      const district1CamapreData = this.campareDistrictData[Object.keys(this.campareDistrictData).filter(item => item.indexOf(this.state1) !== -1)[0]];
      const district2CamapreData = this.campareDistrictData[Object.keys(this.campareDistrictData).filter(item => item.indexOf(this.state2) !== -1)[0]];
      const cats = ["General", "Training", "EquipAndD", "Infra", "Manpower", "LAndD"];
      let district1CamapreDataValues = [];
      let district2CamapreDataValues = [];
      for (const cat of cats) {
        district1CamapreDataValues.push(district1CamapreData[cat]);
      }
      this.pieChartDataDistrict1 = district1CamapreDataValues;

      for (const cat of cats) {
        district2CamapreDataValues.push(district2CamapreData[cat]);
      }
      this.pieChartDataDistrict2 = district2CamapreDataValues;
      console.log(this.pieChartDataDistrict2, 'pieChartDataDistrict2');
      console.log(this.pieChartDataDistrict1, 'pieChartDataDistrict1');
    });
  }

  getDistrictScores(data) {
    if (data && (data.CurMonth - data.PrevMonth) >= 0) {
      return true;
    }
    return false;
  }
  getDistrictChangeValue(data) {
    return Math.abs(+(data.CurMonth - data.PrevMonth).toFixed(0));
  }
  getDistPercentage(data) {
    let res;
    res = ((Math.abs(data.CurMonth - data.PrevMonth) / (data.PrevMonth)) * 100).toFixed(0);
    if (isNaN(res)) {
      return res = 0;
    } else {
      return res;
    }
  }
}
