import { Component, OnInit, Input } from '@angular/core';
import { STATES, BLOCKS, DISTRICTS, FINANCIAL_YEARS, FORMS, SERVICE_POINTS, FREQUENCY } from '../mock-data/mock-data';
import { DashboardService } from '../services/dashboard.services';
import { getShortDate } from '../utils';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.less']
})
export class AnalyzeComponent implements OnInit {

  showAnalysisData = false;
  states: any;
  districts: any;
  financial_year = FINANCIAL_YEARS;
  forms: any;
  service_points = [];
  frequency: any;
  filterHide = true;
  selected_districts: any;
  selected_form: any;
  selected_sp: any;
  selected_State: any;
  selected_freq: any;
  selected_finYear: any;
  allDistrictInUp: any;
  allStateName: string[];
  formMetaData: any;
  analyzedata: any;
  barChartDataValues: any;
  selectedFrequency: any;

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

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllstates();
    this.getFormMetaData();
    this.selected_State = '';
    this.selected_districts = '';
    this.selected_finYear = '';
    this.selected_form = '';
    this.selected_freq = '';
    this.selected_sp = '';
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
    this.selected_finYear = '';
    this.selected_form = '';
    this.selected_freq = '';
    this.selected_sp = '';
  }

  getAllstates() {
    this.dashboardService.getAllDistrictsStats().subscribe(data => {
      this.allDistrictInUp = data;
      Object.keys(this.allDistrictInUp);
      const districtArray = [];
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

  getFormMetaData() {
    this.dashboardService.getAFormMetaData().subscribe(data => {
      this.formMetaData = data;
      this.service_points = this.formMetaData['servicePoint'];
      this.forms = this.formMetaData['form'];
      this.frequency = this.formMetaData['freq'];
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
  }
  getForm(form) {
    this.selected_form = form.target.value;
  }

  getservicePoint(sp) {
    this.selected_sp = sp.target.value;
  }
  getSelectedYear(year) {
    this.selected_finYear = year.target.value;
  }

  getfrequency(freq) {
    this.selectedFrequency = freq.target.value;
  }

  showAnalyze() {
    this.analyzedata = [];
    this.barChartDataValues = [];
    this.barChartLabels = [];
    this.dashboardService.analysisState(this.selected_State, this.selected_districts,
      this.selected_finYear, this.selected_form, this.selected_sp, this.selectedFrequency).subscribe((data) => {
        console.log('Analyse api data: ', data);
        this.analyzedata = data;
        this.barChartDataValues = Object.values(this.analyzedata);
        Object.keys(this.analyzedata).map(item => this.barChartLabels.push(getShortDate(new Date(item))));
        console.log('setting bar chart data: ', this.barChartDataValues, this.barChartLabels);
        this.drawLineChart();
        this.showAnalysisData = true;
      });
  }

  drawLineChart() {
    this.barChartData = [
      {
        label: '# Score',
        data: this.barChartDataValues,
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

}
