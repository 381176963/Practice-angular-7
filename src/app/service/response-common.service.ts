import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GolbalMessageService} from './golbal-message.service';
import {ResponseCommonMessage} from '../message/response-common';

@Injectable({
    providedIn: 'root'
})
export class ResponseCommonService {
    private responseCommonMessage = ResponseCommonMessage;
    constructor(
        private golbalMessageService: GolbalMessageService,
        private router: Router
    ) {}

    /**
     * 判断响应的数据做共通处理
     * 必要的结构是否存在
     * 如果有全局消息则显示
     * 必要的结构存在则返回 true 不存在则返回false 返回与fes_result是否OK无关,即便NG,结构正确也返回true
     */
    responseCommonProcessing(responseData): boolean {
        if (responseData.hasOwnProperty('fes_result')) {
            if (responseData.hasOwnProperty('return_data')) {
                if (
                    responseData['return_data'].hasOwnProperty('global_message') ||
                    responseData['return_data'].hasOwnProperty('global_message_type')
                ) {
                    if (
                        responseData['return_data'].hasOwnProperty('global_message') &&
                        responseData['return_data'].hasOwnProperty('global_message_type')
                    ) {
                        // global_message_type 0 失败 1 成功
                        if ((0 === responseData['return_data']['global_message_type']) ||
                            (1 === responseData['return_data']['global_message_type'])) {
                            this.golbalMessageService.showResponseGolbalMessage (
                                responseData['return_data']['global_message_type'],
                                responseData['return_data']['global_message']
                            );
                        } else {
                            this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['1']);
                        }
                    } else {
                        this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['2']);
                    }
                }
            }

            if ('OK' === responseData['fes_result']) {
                if (responseData.hasOwnProperty('return_data')) {
                    return true;
                } else {
                    this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['0']);
                    return false;
                }
            } else if ('NG' === responseData['fes_result']) {
                if (responseData.hasOwnProperty('error_type') &&
                    responseData.hasOwnProperty('error_code') &&
                    responseData.hasOwnProperty('error_msg')
                ) {
                    if ('4' === responseData['error_type']) {
                        localStorage.clear();
                        this.router.navigate(['/login']);
                    }

                    return true;
                } else {
                    this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['0']);
                    return false;
                }
            } else {
                this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['3']);
                return false;
            }
        } else {
            this.golbalMessageService.showErrorGolbalMessage (this.responseCommonMessage['0']);
            return false;
        }
    }
}
