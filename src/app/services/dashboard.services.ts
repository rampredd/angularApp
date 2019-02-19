import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';
import { handleErrorObservable } from './helper';
import { AuthTokenService } from './auth-token.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }
    private DistrictURL = 'http://61.12.75.226:8080/statesData';
    private FormMetaData = 'http://61.12.75.226:8080/formMetaData';
    private LoginUrl = 'http://61.12.75.226:8080/login';
    private Logout = 'http://61.12.75.226:8080/logout';
    private GeneralURL = 'http://61.12.75.226:8080/tabScore';
    private camapreURL = 'http://61.12.75.226:8080/compareDist';
    private analyzeURL = 'http://61.12.75.226:8080/analyzeDist';
    private growthanalyzeURL = 'http://61.12.75.226:8080/growth-analysis';
    private allDistrictDataURL = 'http://61.12.75.226:8080/allDistrictsTotalScore';

    private URL = '';

    getAllDistrictsStats(): Observable<any> {
        return this.http.get<any>(this.DistrictURL).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('getAllDistrictsData')));
    }

    getAFormMetaData(): Observable<any> {
        return this.http.get<any>(this.FormMetaData).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('getAFormMetaData')));
    }

    userLogin(params): Observable<any> {
        console.log(params, 'params');
        return this.http.post<any>(this.LoginUrl, params).pipe(
            tap(res => {
                console.log(res, 'res');
                this.authTokenService.setToken(res['auth_token']);
            }),
            map(res => res),

            catchError(handleErrorObservable<any>('LoginUrl')));
    }

    userLogout(): Observable<any> {
        return this.http.get<any>(this.Logout).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('LoginUrl')));
    }

    getGeneralData(state: string, tab: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('state', state);
        params = params.append('tab', tab);

        return this.http.get<any>(this.GeneralURL, { params: params }).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('GetGeneralData')));
    }

    getAllData(state: string, tab = []): Observable<any> {
        let getAllCalls = [];
        tab.map(data => {
            let params: HttpParams = new HttpParams();
            params = params.append('state', state);
            params = params.append('tab', data);
            getAllCalls.push(this.http.get<any>(this.GeneralURL, { params: params }));
        });
        return forkJoin(...getAllCalls).pipe(
            catchError((err) => of(err))
        );

    }

    campareTwoDistricts(state1, dis1, state2, dis2, form?) {
        let params: HttpParams = new HttpParams();
        params = params.append('state1', state1);
        if (dis1 && dis1 !== '')
            params = params.append('district1', dis1);
        params = params.append('state2', state2);
        if (dis2 && dis2 !== '')
            params = params.append('district2', dis2);
        if (form) {
            params = params.append('form', form);
            // params = params.append('sp', servicepoint);
        }
        // params = params.append('form', form);
        // params = params.append('sp', servicepoint);
        // params = params.append('district2', date);
        console.log(params, 'params');
        return this.http.get<any>(this.camapreURL, { params: params }).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('getDistrictsNameData')));
    }

    analysisState(state, dis1, year, form, sp, frequency) {
        let params: HttpParams = new HttpParams();
        params = params.append('state', state);
        if (dis1 && dis1 !== '')
            params = params.append('district', dis1);
        if (year && year !== '')
            params = params.append('year', year);
        if (form && form !== '')
            params = params.append('form', form);
        if (sp && sp !== '')
            params = params.append('sp', sp);
        if (frequency && frequency !== '')
            params = params.append('freq', frequency);
        //console.log(params, 'params');
        return this.http.get<any>(this.analyzeURL, { params: params }).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('getDistrictsNameData')));
    }


    growthanalysisState(state, dis, block, form1, form2, form3, form4, freq) {
        let params: HttpParams = new HttpParams();
        params = params.append('state', state);
        if (dis && dis !== '')
            params = params.append('district', dis);
        if (block && block !== '')
            params = params.append('block', block);
        if (form1 && form1 !== '')
            params = params.append('form1', form1);
        if (form2 && form2 !== '')
            params = params.append('form2', form2);
        if (form3 && form3 !== '')
            params = params.append('form3', form3);
        if (form4 && form4 !== '')
            params = params.append('form4', form4);
        if (freq && freq !== '')
            params = params.append('freq', freq);


        console.log(params, 'params');
        return this.http.get<any>(this.growthanalyzeURL, { params: params }).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('getDistrictsNameData')));
    }



    getAllDistrictsData(): Observable<any> {
        return this.http.get<any>(this.allDistrictDataURL).pipe(
            map(res => res),
            catchError(handleErrorObservable<any>('allDistrictData')));
    }




}
