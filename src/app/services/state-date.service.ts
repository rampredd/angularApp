import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StateDataService {
    private readonly stateDataChangedSrc = new Subject<boolean>();

    getStateData() {
        return this.stateDataChangedSrc.asObservable();
    }

    setStateData(data) {
        this.stateDataChangedSrc.next(data);
    }
}
