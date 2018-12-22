import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import {Router} from '@angular/router';

import { HttpService } from '../../service/http.service';
import { GolbalMessageService } from '../../service/golbal-message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginInfo: any = {};
    validateForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private apiService: HttpService,
        private golbalMessageService: GolbalMessageService,
        private router: Router
    ) {
        const access_token = localStorage.getItem('access_token');
        if (!(access_token === null) || (access_token === '')) {
            this.router.navigate(['/layout/home']);
        }
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
            remember: [ true ]
        });
    }

    submitForm(): void {
        let validateFlag = true;

        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {

                this.loginInfo[i] = this.validateForm.controls[i].value;

                if ('INVALID' === this.validateForm.controls[i].status) {
                    validateFlag = false;
                }

                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
        }

        if (validateFlag) {
            this.loginStep(this.loginInfo);
        } else {
            return;
        }
    }

    loginStep(loginInfo: {
        userName: string;
        password: string;
        remember: boolean;
    }) {
        // this.apiService.login(loginInfo)
        //     .subscribe(
        //         (data) => this.loginResponse(data)
        //     );

        localStorage.setItem('access_token', '12345678');
        localStorage.setItem('refresh_token', '12345678');
        this.router.navigate(['/layout/home']);
    }

    private loginResponse(responseData) {
        this.golbalMessageService.showResponseGolbalMessage (responseData);

        if (responseData.hasOwnProperty('fes_result')) {
            if ('OK' === responseData['fes_result']) {
                if (
                    responseData.hasOwnProperty('return_data') &&
                    responseData['return_data'].hasOwnProperty('access_token') &&
                    ('' !== responseData['return_data']['access_token'])
                ) {
                    localStorage.setItem('access_token', responseData['return_data']['access_token']);
                    if (
                        responseData['return_data'].hasOwnProperty('refresh_token') &&
                        ('' !== responseData['return_data']['refresh_token'])
                    ) {
                        localStorage.setItem('refresh_token', responseData['return_data']['refresh_token']);
                    }

                    this.router.navigate(['/layout/home']);
                } else {
                    this.golbalMessageService.showErrorGolbalMessage ('服务器返回认证参数不完整');
                }
            }
        }
    }
}
