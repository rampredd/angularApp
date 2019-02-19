import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
/**
 * Created by vikram on 5/10/17.
 */

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {
    readonly STORAGE_KEY_AUTH = 'niti-auth-token';
    private authToken: string;

    constructor(private localStorage: LocalStorageService) { }

    setToken(token) {
        this.authToken = token;
        this.saveToken(token);
    }

    getToken() {
        if (!this.authToken) {
            this.authToken = this.getSavedToken();
        }
        return this.authToken;
    }

    clear() {
        this.localStorage.clearAll();
        this.authToken = null;
    }

    private saveToken(token) {
        console.log('saving token : ' + token);
        this.localStorage.set(this.STORAGE_KEY_AUTH, token);
    }

    private getSavedToken(): string {
        // get from local storage
        return this.localStorage.get<string>(this.STORAGE_KEY_AUTH);
    }
}
