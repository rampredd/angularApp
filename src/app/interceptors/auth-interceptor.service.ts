import { Injectable } from '@angular/core';
import { HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AuthTokenService } from '../services/auth-token.service';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService {

    constructor(private authService: AuthTokenService, private router: Router) { }

    errorHandler() {
        return catchError((error: HttpErrorResponse) => {
            const date = new Date().toUTCString();
            const errMsg = '';
            if (error instanceof HttpErrorResponse) {

                // The response body may contain clues as to what went wrong
                switch (error.status) {
                    case 401: {
                        setTimeout(() => {
                            this.router.navigate(['/login']);

                        }, 0);
                        break;
                    }
                    case 403: {
                        this.router.navigate(['/login']);
                    }
                }
            } else {
                console.error('smtg went wrong');
            }
            return throwError(errMsg);
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const url = req.url;
        console.log(url, 'url');
        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
            return next.handle(authReq).pipe(this.errorHandler());
        } else {
            return next.handle(req).pipe(this.errorHandler());
        }
    }
}

