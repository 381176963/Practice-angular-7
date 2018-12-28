import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpService } from '../../service/http.service';
import {ResponseCommonService} from '../../service/response-common.service';

@Component({
    selector: 'app-picture-info',
    templateUrl: './picture-info.component.html',
    styleUrls: ['./picture-info.component.scss']
})
export class PictureInfoComponent implements OnInit {
    pictureInfo: any = {};
    validateForm: FormGroup;
    savePictureUploadUrl: string;

    // defaultFileList = [
    //     {
    //         uid: -1,
    //         name: 'xxx.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    //     },
    //     {
    //         uid: -2,
    //         name: 'yyy.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    //     }
    // ];

    // fileList1 = [...this.defaultFileList];

    fileList = [
        {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
    ];
    previewImage = '';
    previewVisible = false;




    constructor(
        private fb: FormBuilder,
        private apiService: HttpService,
        private msg: NzMessageService,
        private responseCommonService: ResponseCommonService
    ) {
        this.savePictureUploadUrl = this.apiService.getSavePictureUploadUrl();
        console.log(this.savePictureUploadUrl);
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

    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }

    saveStep(pictureInfo) {
        this.apiService.savePicture(pictureInfo)
            .subscribe(
                (data) => this.saveResponse(data)
            );
    }

    private saveResponse(responseData) {
        const responseCommonFlag = this.responseCommonService.responseCommonProcessing(responseData);
        if (responseCommonFlag) {
            if ('OK' === responseData['fes_result']) {

            }
        }
    }

    requiredChange(required: boolean): void {
        if (!required) {
            this.validateForm.get('nickname').clearValidators();
            this.validateForm.get('nickname').markAsPristine();
        } else {
            this.validateForm.get('nickname').setValidators(Validators.required);
            this.validateForm.get('nickname').markAsDirty();
        }
        this.validateForm.get('nickname').updateValueAndValidity();
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name    : [ null, [ Validators.required ] ],
            nickname: [ null ],
            picture : [ null, [ Validators.required ] ],
        });
    }






    constructor(private http: HttpClient, private msg: NzMessageService) {}

    customReq = (item: UploadXHRArgs) => {
        // 构建一个 FormData 对象，用于存储文件或其他参数
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append('file', item.file as any);
        formData.append('id', '1000');
        const req = new HttpRequest('POST', item.action, formData, {
            reportProgress : true,
            withCredentials: true
        });
        // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
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
            }
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }

    // 一个简单的分片上传
    customBigReq = (item: UploadXHRArgs) => {
        const size = item.file.size;
        const chunkSize = parseInt((size / 3) + '', 10);
        const maxChunk = Math.ceil(size / chunkSize);
        const reqs = Array(maxChunk).fill(0).map((v: {}, index: number) => {
            const start = index * chunkSize;
            let end = start + chunkSize;
            if (size - end < 0) {
                end = size;
            }
            const formData = new FormData();
            formData.append('file', item.file.slice(start, end));
            formData.append('start', start.toString());
            formData.append('end', end.toString());
            formData.append('index', index.toString());
            const req = new HttpRequest('POST', item.action, formData, {
                withCredentials: true
            });
            return this.http.request(req);
        });
        return forkJoin(...reqs).subscribe(resules => {
            // 处理成功
            item.onSuccess({}, item.file, event);
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }
}
