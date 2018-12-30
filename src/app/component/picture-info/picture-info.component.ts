import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { HttpService } from '../../service/http.service';
import {ResponseCommonService} from '../../service/response-common.service';
import {HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse, HttpHeaders} from '@angular/common/http';
import { UploadXHRArgs } from 'ng-zorro-antd';

@Component({
    selector: 'app-picture-info',
    templateUrl: './picture-info.component.html',
    styleUrls: ['./picture-info.component.scss']
})
export class PictureInfoComponent implements OnInit {
    pictureInfo: any = {};
    validateForm: FormGroup;
    savePictureUploadUrl: string;

    inputDate: object = {
        path: '',
        name: 'xiaohe',
        type: '00',
    }

    isLoadingOne = false;

    constructor(
        private fb: FormBuilder,
        private apiService: HttpService,
        private responseCommonService: ResponseCommonService,
        private http: HttpClient // TODO 图片上传
    ) {
        this.savePictureUploadUrl = this.apiService.getSavePictureUploadUrl();
    }

    submitForm(): void {
        let validateFlag = true;

        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
                this.pictureInfo[i] = this.validateForm.controls[i].value;

                if ('INVALID' === this.validateForm.controls[i].status) {
                    validateFlag = false;
                }

                this.validateForm.controls[ i ].markAsDirty();
                this.validateForm.controls[ i ].updateValueAndValidity();
            }
        }

        if (validateFlag) {
            this.saveStep(this.pictureInfo);
        } else {
            return;
        }
    }

    saveStep(pictureInfo) {
        this.isLoadingOne = true;

        this.apiService.savePicture(pictureInfo)
            .subscribe(
                (data) => this.saveResponse(data),
                error => this.saveAbnormalResponse(error)
            );
    }

    private saveResponse(responseData) {
        this.isLoadingOne = false;

        const responseCommonFlag = this.responseCommonService.responseCommonProcessing(responseData);
        if (responseCommonFlag) {
            if ('OK' === responseData['fes_result']) {

            }
        }
    }

    private saveAbnormalResponse(error) {
        this.isLoadingOne = false;
    }

    private uploadResponse(responseData) {
        const responseCommonFlag = this.responseCommonService.responseCommonProcessing(responseData);
        if (responseCommonFlag) {
            if ('OK' === responseData['fes_result']) {
                if (responseData['return_data'].hasOwnProperty('imagePath')) {
                    this.validateForm.get('path').setValue(responseData['return_data']['imagePath']);
                }
            }
        }
    }

    customReq = (item: UploadXHRArgs) => {
        // 构建一个 FormData 对象，用于存储文件或其他参数
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append('file', item.file as any);
        formData.append('id', '1000');

        const access_token = localStorage.getItem('access_token');

        // TODO 这里需要判断 现在还没处理妥当
        // if ((access_token === null) || (access_token === '')) {
        //     localStorage.setItem('activated_route_root_snapshot_routerState_url', this.route.root.snapshot['_routerState'].url);
        //     this.router.navigate(['/login']);
        // }
        const req = new HttpRequest('POST', item.action, formData, {
            headers : new HttpHeaders({ 'Access-Token': access_token })
        });
        // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
        const thisComponent = this;
        return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    // tslint:disable-next-line:no-any
                    (event as any).percent = event.loaded / event.total * 100;
                }
                // 处理上传进度条，必须指定 `percent` 属性来表示进度
                item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse) {
                // 处理成功
                item.onSuccess(event.body, item.file, event);
                console.log(event.body);
                thisComponent.uploadResponse(event.body);
            }
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [this.inputDate['name'], [Validators.required]],
            type: [this.inputDate['type'], [Validators.required]],
            path: [this.inputDate['path'], [Validators.required]],
        });
    }
}
