import { Injectable } from '@angular/core';
import { HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class LoaderInterceptorService {

    constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        setTimeout(() => this.loaderService.showLoader());
        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    setTimeout(() => this.loaderService.hideLoader());
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    setTimeout(() => this.loaderService.hideLoader());
                }
                throw Error(
                    'failed Login.');
            }));
    }
}
