import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {GolbalMessageService} from '../../service/golbal-message.service';
import {ResponseCommonService} from '../../service/response-common.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    inputDate: object = {};

    isLoadingOne = false;
    isSpinning = true;

    constructor(
        private apiService: HttpService,
        private golbalMessageService: GolbalMessageService,
        private responseCommonService: ResponseCommonService
    ) {}

    ngOnInit() {
        this.getHomeInfo();
    }

    getHomeInfo() {
        this.apiService.getHomeInfo()
            .subscribe(
                (data) => this.getHomeInfoResponse(data),
                error => this.getHomeInfoAbnormalResponse(error)
            );
    }

    save() {
        this.isLoadingOne = true;

        this.apiService.homeSave(this.inputDate)
            .subscribe(
                (data) => this.saveResponse(data),
                error => this.saveAbnormalResponse(error)
            );
    }

    private getHomeInfoResponse(responseData) {
        this.isSpinning = false;
        this.responseCommonService.responseCommonProcessing(responseData);
        if ('OK' === responseData['fes_result']) {
            if (
                responseData['return_data'].hasOwnProperty('homeData')
            ) {
                this.inputDate = responseData['return_data']['homeData'];
            }
        }
    }

    private saveResponse(responseData) {
        this.isLoadingOne = false;
        this.responseCommonService.responseCommonProcessing(responseData);
    }

    private getHomeInfoAbnormalResponse(error) {
        this.isSpinning = false;
    }

    private saveAbnormalResponse(error) {
        this.isLoadingOne = false;
    }
}
