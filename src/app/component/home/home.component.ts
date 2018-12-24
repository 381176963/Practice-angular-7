import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {GolbalMessageService} from '../../service/golbal-message.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    inputDate: object = {};

    isLoadingOne = false;

    constructor(
        private apiService: HttpService,
        private golbalMessageService: GolbalMessageService
    ) {
    }

    ngOnInit() {
        // this.inputDate['richText'] = '您好啊';
        this.getHomeInfo();
    }

    getHomeInfo() {
        // this.isLoadingOne = true;

        this.apiService.getHomeInfo()
            .subscribe(
                (data) => this.getHomeInfoResponse(data)
            );
    }

    save() {
        this.isLoadingOne = true;

        this.apiService.homeSave(this.inputDate)
            .subscribe(
                (data) => this.saveResponse(data)
            );
    }

    private getHomeInfoResponse(responseData) {
        console.log(responseData);
        if (responseData.hasOwnProperty('fes_result')) {
            if ('OK' === responseData['fes_result']) {
                if (
                    responseData.hasOwnProperty('return_data')
                ) {
                    if (
                        responseData['return_data'].hasOwnProperty('homeData')
                    ) {
                        this.inputDate = responseData['return_data']['homeData'];
                        console.log(this.inputDate);
                    }
                } else {
                    this.golbalMessageService.showErrorGolbalMessage ('服务器返回认证参数不完整');
                }
            }
        }
        // this.inputDate['richText'] = responseData;
    }

    private saveResponse(responseData) {
        this.isLoadingOne = false;
        this.golbalMessageService.showResponseGolbalMessage (responseData);

        if (responseData.hasOwnProperty('fes_result')) {
            if ('OK' === responseData['fes_result']) {
                if (
                    responseData.hasOwnProperty('return_data')
                ) {

                } else {
                    this.golbalMessageService.showErrorGolbalMessage ('服务器返回认证参数不完整');
                }
            }
        }
    }

    // loadOne(): void {
    //     this.isLoadingOne = true;
    //     setTimeout(_ => {
    //         this.isLoadingOne = false;
    //     }, 1000);
    // }
}
