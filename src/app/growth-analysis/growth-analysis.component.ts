import { District } from './../entities/district';
import { Component, OnInit } from '@angular/core';
import { STATES, BLOCKS, DISTRICTS, FINANCIAL_YEARS, FORMS, SERVICE_POINTS, FREQUENCY } from '../mock-data/mock-data';
import { DashboardService } from '../services/dashboard.services';
import { getShortDate } from '../utils';

@Component({
  selector: 'app-growth-analysis',
  templateUrl: './growth-analysis.component.html',
  styleUrls: ['./growth-analysis.component.less']
})
export class GrowthAnalysisComponent implements OnInit {

  showAnalysisData = false;
  states: any;
  districts: any;
  financial_year = FINANCIAL_YEARS;
  forms: any;
  service_points: any;
  frequency: any;
  filterHide = true;
  selected_districts: any;
  selected_form1: any;
  selected_sp: any;
  selected_State: any;
  selected_freq: any;
  selected_finYear: any;

  // lineChart

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [

    { // grey
      backgroundColor: 'rgb(255, 255, 255, 0.2)',
      borderColor: 'rgb(0, 184, 255)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgb(255, 255, 255, 0.2)',
      borderColor: 'rgb(0, 194, 232)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgb(255, 255, 255, 0.2)',
      borderColor: 'rgb(225, 128, 0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgb(255, 255, 255, 0.2)',
      borderColor: 'rgb(63, 72, 204)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  allDistrictInUp: any;
  allStateName: string[];
  formMetaData: any;
  analyzedata: any;
  lineChartData: any;
  lineChartLabels: any;

  selected_form2: any;
  selected_form3: any;
  selected_form4: any;

  public blocks = [];
  public selected_block: any;
  public currentDistrictBlocks = [];


  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllstates();
    this.getFormMetaData();
    this.selected_State = '';
    this.selected_districts = '';
    this.selected_form1 = '';
    this.selected_form2 = '';
    this.selected_form3 = '';
    this.selected_form4 = '';
    this.selected_freq = '';
    this.selected_block = '';
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  clearFields() {
    this.showAnalysisData = false;
    this.selected_State = '';
    this.selected_districts = '';
    this.selected_form1 = '';
    this.selected_form2 = '';
    this.selected_form3 = '';
    this.selected_form4 = '';
    this.selected_freq = '';
    this.selected_block = '';
    this.currentDistrictBlocks = [];
  }

  getAllstates() {
    this.dashboardService.getAllDistrictsStats().subscribe(data => {
      this.allDistrictInUp = data;
      console.log('districts data ', data);
      const districtArray = [];
      const blocks = [];
      for (const key of Object.keys(this.allDistrictInUp)) {
        districtArray[key] = Object.keys(this.allDistrictInUp[key]);
        for (const blk of Object.keys(this.allDistrictInUp[key])) {
          blocks[blk] = this.allDistrictInUp[key][blk];
        }
      }
      console.log('local district array', districtArray);
      this.blocks = blocks;
      this.allStateName = Object.keys(districtArray);
      console.log('all blocks array', this.blocks);
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }

  getFormMetaData() {
    this.dashboardService.getAFormMetaData().subscribe(data => {
      this.formMetaData = data;
      this.service_points = this.formMetaData['servicePoint'];
      this.forms = this.formMetaData['form'];
      this.frequency = this.formMetaData['freq'];
      console.log('setting frequecy data', this.frequency);
      console.log(this.formMetaData['servicePoint'], 'formMetaData');
    },
      (error) => {
        console.log(`bad req from api ${error}`);
      }
    );
  }

  changeState(state1) {
    const selectedState = state1.target.value;
    this.selected_State = selectedState;
    this.districts = Object.keys(this.allDistrictInUp[selectedState]);
    console.log(this.districts, 'districts1');
  }

  getDistrict(district1) {
    this.selected_districts = district1.target.value;
    this.currentDistrictBlocks = this.blocks[this.selected_districts];
    console.log('updating current districts', this.currentDistrictBlocks, this.blocks);
  }

  getBlock(block) {
    this.selected_block = block.target.value;
  }

  getForm(form) {
    this.selected_form1 = form.target.value;
  }

  getForm2(form) {
    this.selected_form2 = form.target.value;
  }

  getForm3(form) {
    this.selected_form3 = form.target.value;
  }

  getForm4(form) {
    this.selected_form4 = form.target.value;
  }


  getservicePoint(sp) {
    this.selected_sp = sp.target.value;
  }
  getSelectedYear(year) {
    this.selected_finYear = year.target.value;
  }

  showAnalyze() {
    this.showAnalysisData = false;
    const selectedForms = [this.selected_form1, this.selected_form2, this.selected_form3, this.selected_form4];

    for (let i = 0; i < selectedForms.length; i++) {
      const currentForm = selectedForms[i];
      for (let j = 0; j < selectedForms.length; j++) {
        if (i !== j && currentForm !== '' && selectedForms[j] !== ''
          && currentForm === selectedForms[j]) {
          alert('Two of the selected forms are same, please select distinct forms');
          return;
        }
      }
    }
    this.dashboardService.growthanalysisState(this.selected_State, this.selected_districts, this.selected_block,
      this.selected_form1, this.selected_form2, this.selected_form3, this.selected_form4, this.selected_freq).subscribe((data) => {
        console.log('growth analysis chart data: ', data);
        let chartData = [];
        let chartLabels = [];
        this.analyzedata = data;
        Object.keys(this.analyzedata).map(key => {
          chartData.push({ label: key, data: Object.values(this.analyzedata[key]) });
          if (chartLabels.length < Object.keys(this.analyzedata[key]).length) {
            chartLabels = [];
            Object.keys(this.analyzedata[key])
              .map(item => chartLabels.push(getShortDate(new Date(item))));
          }
        });

        this.lineChartData = chartData;
        this.lineChartLabels = chartLabels;
        console.log('final chart data', this.lineChartData, this.lineChartLabels);
        this.showAnalysisData = true;
      });
  }
}
