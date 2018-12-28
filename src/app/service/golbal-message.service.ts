import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class GolbalMessageService {

    constructor(private golbalMessage: NzMessageService) {
    }

    // showResponseGolbalMessage (responseData) {
    //     if (responseData.hasOwnProperty('return_data')) {
    //         if (
    //             responseData['return_data'].hasOwnProperty('global_message') ||
    //             responseData['return_data'].hasOwnProperty('global_message_type')
    //         ) {
    //             if (
    //                 responseData['return_data'].hasOwnProperty('global_message') &&
    //                 responseData['return_data'].hasOwnProperty('global_message_type')
    //             ) {
    //                 const global_message_type: string[] = ['error', 'success'];
    //                 this.golbalMessage.create(
    //                     global_message_type[responseData['return_data']['global_message_type']],
    //                     responseData['return_data']['global_message'],
    //                     { nzDuration: 2000 , nzPauseOnHover: true}
    //                 );
    //             } else {
    //                 this.golbalMessage.error('服务器返回全局消息参数不完整', { nzDuration: 2000 , nzPauseOnHover: true});
    //             }
    //         }
    //     }
    // }

    showResponseGolbalMessage (global_message_type, global_message) {
        const global_message_type_string: string[] = ['error', 'success'];
        this.golbalMessage.create(
            global_message_type_string[global_message_type],
            global_message,
            { nzDuration: 2000 , nzPauseOnHover: true}
        );
    }

    showSuccessGolbalMessage (message: string) {
        this.golbalMessage.success(message, { nzDuration: 2000 , nzPauseOnHover: true});
    }

    showErrorGolbalMessage (message: string) {
        this.golbalMessage.error(message, { nzDuration: 2000 , nzPauseOnHover: true});
    }
}
