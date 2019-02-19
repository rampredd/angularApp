import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private readonly isLoadingSrc = new Subject<boolean>();

    isLoading() {
        return this.isLoadingSrc.asObservable();
    }

    showLoader() {
        this.isLoadingSrc.next(true);
    }

    hideLoader() {
        this.isLoadingSrc.next(false);
    }

}
