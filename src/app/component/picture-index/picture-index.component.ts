import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {ResponseCommonService} from '../../service/response-common.service';

@Component({
  selector: 'app-picture-index',
  templateUrl: './picture-index.component.html',
  styleUrls: ['./picture-index.component.scss']
})
export class PictureIndexComponent implements OnInit {
    validateForm: FormGroup;
    controlArray = [];
    isCollapse = true;


    picture_list = {};
    editCache = {};
    dataSet = [];


    toggleCollapse(): void {
        this.isCollapse = !this.isCollapse;
        this.controlArray.forEach((c, index) => {
            c.show = this.isCollapse ? (index < 6) : true;
        });
    }

    resetForm(): void {
        this.validateForm.reset();
    }

    constructor(
        private fb: FormBuilder,
        private apiService: HttpService,
        private responseCommonService: ResponseCommonService,
    ) {}




    startEdit(key: string): void {
        this.editCache[ key ].edit = true;
    }

    cancelEdit(key: string): void {
        this.editCache[ key ].edit = false;
    }

    saveEdit(key: string): void {
        const index = this.dataSet.findIndex(item => item.key === key);
        Object.assign(this.dataSet[ index ], this.editCache[ key ].data);
        // this.dataSet[ index ] = this.editCache[ key ].data;
        this.editCache[ key ].edit = false;
    }

    updateEditCache(): void {
        console.log(this.dataSet);
        this.dataSet.forEach(item => {
            if (!this.editCache[ item.key ]) {
                this.editCache[ item.key ] = {
                    edit: false,
                    data: { ...item }
                };
            }
        });
    }

    getPictureList() {
        this.apiService.getPictureList()
            .subscribe(
                (data) => this.getPictureListResponse(data),
                error => this.getPictureListAbnormalResponse(error)
            );
    }

    private getPictureListResponse(responseData) {
        this.responseCommonService.responseCommonProcessing(responseData);
        if ('OK' === responseData['fes_result']) {
            if (
                responseData['return_data'].hasOwnProperty('picture_list')
            ) {
                this.picture_list = responseData['return_data']['picture_list'];
                console.log(this.picture_list);
                for (const i in this.picture_list) {
                    if (this.picture_list.hasOwnProperty(i)) {
                        this.dataSet.push({
                            key: this.picture_list[i]['id'],
                            name: this.picture_list[i]['name'],
                            type: this.picture_list[i]['type'],
                            path: this.picture_list[i]['full_path'],
                        });
                    }
                }
                this.updateEditCache();
            }
        }
    }

    private getPictureListAbnormalResponse(error) {
        // this.isSpinning = false;
    }

    ngOnInit() {
        this.validateForm = this.fb.group({});
        for (let i = 0; i < 10; i++) {
            this.controlArray.push({ index: i, show: i < 6 });
            this.validateForm.addControl(`field${i}`, new FormControl());
        }

        this.getPictureList();
    }
}
