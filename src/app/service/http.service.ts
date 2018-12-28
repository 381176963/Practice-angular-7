import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd';

const http_base_url = 'http://127.0.0.1:8000/';
const http_login_url = 'login';
const http_get_home_url = 'getHomeInfo';
const http_home_save_url = 'homeSave';
const http_picture_save_url = 'pictureSave';
const http_picture_save_upload_url = 'pictureSaveUpload';

const httpOptionsLogin = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
let httpOptions = {};

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor( private http: HttpClient, private golobalMessage: NzMessageService ) {}

    login(loginInfo) {
        return this.http.post<any>((http_base_url + http_login_url), loginInfo, httpOptionsLogin)
            .pipe(
                retry(1),
                catchError((error) => this.handleError(error))
            );
    }

    getHomeInfo() {
        this.judgeAccessToken();
        return this.http.post<any>((http_base_url + http_get_home_url), {}, httpOptions)
            .pipe(
                retry(2),
                catchError((error) => this.handleError(error))
            );
    }

    homeSave(saveData) {
        this.judgeAccessToken();
        return this.http.post<any>((http_base_url + http_home_save_url), saveData, httpOptions)
            .pipe(
                retry(1),
                catchError((error) => this.handleError(error))
            );
    }

    savePicture(saveData) {
        this.judgeAccessToken();
        return this.http.post<any>((http_base_url + http_picture_save_url), saveData, httpOptions)
            .pipe(
                retry(1),
                catchError((error) => this.handleError(error))
            );
    }

    getSavePictureUploadUrl(): string {
        return http_base_url + http_picture_save_upload_url;
    }

    private judgeAccessToken() {
        const access_token = localStorage.getItem('access_token');
        if ((access_token === null) || (access_token === '')) {
            httpOptions = httpOptionsLogin;
        } else {
            httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Token': access_token })
            };
        }
    }

    private handleError(error: HttpErrorResponse) {
        this.golobalMessage.create('error', `This is a message of error`);

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
