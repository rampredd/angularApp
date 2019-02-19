import { District } from './../entities/district';
import { Component, OnInit } from '@angular/core';
import { STATES, BLOCKS, DISTRICTS, FINANCIAL_YEARS, FORMS, SERVICE_POINTS, FREQUENCY } from '../mock-data/mock-data';
import { DashboardService } from '../services/dashboard.services';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.less']
})
export class CompareComponent implements OnInit {

  showCompareData = false;
  filterHide = false;
  blocks = BLOCKS;
  districts1 = [];
  districts2 = [];
  formMetaData;
  forms = FORMS;
  service_points: any;
  frequency: any;

  public pieChartColors: Array<any> = [{
    backgroundColor: [
      'rgb(0, 194, 232)',
      'rgb(225, 0, 44)',
      'rgb(179, 0, 62)',
      'rgb(14, 112, 150)',
      'rgb(255, 193, 0)',
      'rgb(2, 188, 83)'
    ]
  }];
  public pieChartLabels: string[] = ['General', 'Trainings', 'Equip & D', 'Infra', 'Manpower', 'L&D'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';
  allStateName: string[] = [];
  private allDistrictInUp: any;

  errormsg = false;
  campareDistrictData: any;
  pieChartDataDistrict1: any[];
  pieChartDataDistrict2: any[];
  district1CamapreData: any = {};
  district2CamapreData: any = {};
  selectedState2 = '';
  selectedState1 = '';
  selected_districts1 = '';
  selected_districts2 = '';
  selected_date: any;
  selected_form: any;
  selected_sp: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllstates();
    this.getFormMetaData();
    this.selected_districts1 = '';
    this.selected_districts2 = '';
    this.selected_date = '';
    this.selected_form = '';
    this.selected_sp = '';
    this.selectedState1 = '';
    this.selectedState2 = '';
  }

  clearFields() {
    this.showCompareData = false;
    this.errormsg = false;
    this.selected_districts1 = '';
    this.selected_districts2 = '';
    this.selected_date = '';
    this.selected_form = '';
    this.selected_sp = '';
    this.selectedState1 = '';
    this.selectedState2 = '';
    this.district1CamapreData = {};
    this.district2CamapreData = {};
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

  changeState1(state1) {
    const selectedState = state1.target.value;
    this.selectedState1 = selectedState;
    this.districts1 = Object.keys(this.allDistrictInUp[selectedState]);
    console.log(this.districts1, 'districts1');
  }

  changeState2(state2) {
    const selectedState = state2.target.value;
    this.selectedState2 = selectedState;
    this.districts2 = Object.keys(this.allDistrictInUp[selectedState]);
    console.log(this.districts2, 'districts1');
  }

  getDistrict1(district1) {
    this.selected_districts1 = district1.target.value;
  }

  getDistrict2(district2) {
    this.selected_districts2 = district2.target.value;
  }

  getdate(date) {
    this.selected_date = date.target.value;
    console.log(this.selected_date, 'date');
  }

  getForm(form) {
    this.selected_form = form.target.value;
  }

  getservicePoint(sp) {
    this.selected_sp = sp.target.value;
  }

  onPrint(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Compare state/district performance</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }


  campareStateData() {
    // const validData = this.selectedState1 && this.selectedState2 && this.selected_districts1 && this.selected_districts2
    //   && this.selected_form;
    // if (!validData) {
    //   this.errormsg = true;
    //   return false;
    // }
    this.dashboardService.campareTwoDistricts(this.selectedState1, this.selected_districts1,
      this.selectedState2, this.selected_districts2, this.selected_form)
      .subscribe(data => {
        this.campareDistrictData = data;
        console.log(data);
        if (!this.campareDistrictData)
          return;
        this.showCompareData = true;
        const districtKey1 = this.selectedState1 + (this.selected_districts1 ? '|' + this.selected_districts1 : "");
        const districtKey2 = this.selectedState2 + (this.selected_districts2 ? '|' + this.selected_districts2 : "");
        this.district1CamapreData = this.campareDistrictData[Object.keys(this.campareDistrictData)
          .filter(item => item.indexOf(districtKey1) !== -1)[0]];
        this.district2CamapreData = this.campareDistrictData[Object.keys(this.campareDistrictData)
          .filter(item => item.indexOf(districtKey2) !== -1)[0]];

        const cats = ["General", "Training", "EquipAndD", "Infra", "Manpower", "LAndD"];
        const district1CamapreDataValues = [];
        const district2CamapreDataValues = [];
        console.log('compare data', this.district1CamapreData);
        for (const cat of cats) {
          district1CamapreDataValues.push(this.district1CamapreData[cat]);
          this.pieChartDataDistrict1 = district1CamapreDataValues;
        }
        for (const cat of cats) {
          district2CamapreDataValues.push(this.district2CamapreData[cat]);
          this.pieChartDataDistrict2 = district2CamapreDataValues;
        }
        console.log(this.pieChartDataDistrict2, 'pieChartDataDistrict2');
        console.log(this.pieChartDataDistrict1, 'pieChartDataDistrict1');
      });
  }

}
