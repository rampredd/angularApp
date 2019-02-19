import { StateDataService } from './services/state-date.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthTokenService } from './services/auth-token.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery/dist/jquery.js';
import { AboutComponent } from './about/about.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CompareComponent } from './compare/compare.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrowthAnalysisComponent } from './growth-analysis/growth-analysis.component';
import { LoginComponent } from './login/login.component';
import { AgmCoreModule } from '@agm/core';

import { SidenavComponent } from './sidenav/sidenav.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { ChartsModule } from 'ng2-charts';
import { GoogleMapComponent } from './google-map/google-map.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { DashboardService } from './services/dashboard.services';
import { SettingsComponent } from './settings/settings.component';
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnalyzeComponent,
    CompareComponent,
    DashboardComponent,
    GrowthAnalysisComponent,
    LoginComponent,
    SidenavComponent,
    DisplayDataComponent,
    GoogleMapComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrkI3FCHAeT0WWbJCD3qDQbXSzLAyQfis'
    }),
    LocalStorageModule.forRoot({
      prefix: 'niti-dashboard-app',
      storageType: 'localStorage'
    }),

  ],
  providers: [httpInterceptorProviders, DashboardService, AuthGuardService,
    LocalStorageService, AuthTokenService, StateDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
