import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd';

import { LoginInfo } from '../data-struct/loginInfo';

const http_base_url = 'http://127.0.0.1:8000/';
const http_login_url = 'login';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor( private http: HttpClient, private golobalMessage: NzMessageService ) { }

    login(loginInfo) {
        return this.http.post<any>((http_base_url + http_login_url), loginInfo, httpOptions)
            .pipe(
                retry(1),
                catchError((error) => this.handleError(error))
            );
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
