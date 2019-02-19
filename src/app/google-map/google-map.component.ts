import { StateDataService } from './../services/state-date.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GoogleMarker } from '../entities/marker';
import { STATES, GEO_COORDS } from '../mock-data/mock-data';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.less']
})
export class GoogleMapComponent implements OnInit {
  lat = 27.166666666666668;
  lng = 78.08333333333333;

  upKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/up1.kml';
  assamKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/assam1.kml';
  mpKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/mp1.kml';
  jharkhandKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/jharkhand1.kml';
  biharKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/bihar1.kml';
  maharastraKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/maharastra1.kml';
  rajasthanKlm = 'https://s3.ap-south-1.amazonaws.com/advdata/rajasthan1.kml';

  markers: GoogleMarker[] = [];
  zoom = 15;
  contentData = {};
  @Input() states;
  @Output() stateChangeO = new EventEmitter();
  @Input() seletedState;
  @Input() selectedStateData: any;
  district;
  geoCoords = GEO_COORDS;

  @ViewChild('gmap') gmap: AgmMap;

  constructor(private stateDataService: StateDataService) { }

  ngOnInit() {
    console.log('selected state data ', this.selectedStateData);
    this.markers = [];
    this.stateDataService.getStateData().subscribe(data => {
      console.log('Google maps: selected state data changed', data);
      this.selectedStateData = data;
      this.setMarkers();
    });
    //this.setMarkers();
  }

  setMarkers() {
    const currentDists = this.geoCoords.filter(item => item.state === this.seletedState);
    console.log(currentDists, 'datacureentdis');
    currentDists.map(dist => {
      console.log('pushing marker data', dist.district, this.selectedStateData[dist.district]);
      this.markers.push({
        lat: dist.lat,
        lng: dist.lng,
        data: this.selectedStateData[dist.district],
        draggable: false,
        district: dist.district
      });
    });
  }

  clickedMarker(currentDetails) {
    this.contentData = currentDetails.data;
    console.log(this.contentData, 'currentDetails');
    this.district = currentDetails.district;
  }

  statesChangeEevnt(item) {
    this.markers = [];
    console.log(item, 'item');
    this.seletedState = item.target.value;
    this.stateChangeO.emit(this.seletedState);
    console.log(this.seletedState, 'item');
    console.log('selected state data ', this.selectedStateData);
    //this.setMarkers();
  }

}

