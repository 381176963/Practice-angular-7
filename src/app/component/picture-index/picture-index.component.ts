import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-picture-index',
  templateUrl: './picture-index.component.html',
  styleUrls: ['./picture-index.component.scss']
})
export class PictureIndexComponent implements OnInit {
    validateForm: FormGroup;
    controlArray = [];
    isCollapse = true;

    toggleCollapse(): void {
        this.isCollapse = !this.isCollapse;
        this.controlArray.forEach((c, index) => {
            c.show = this.isCollapse ? (index < 6) : true;
        });
    }

    resetForm(): void {
        this.validateForm.reset();
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({});
        for (let i = 0; i < 10; i++) {
            this.controlArray.push({ index: i, show: i < 6 });
            this.validateForm.addControl(`field${i}`, new FormControl());
        }
    }
}
