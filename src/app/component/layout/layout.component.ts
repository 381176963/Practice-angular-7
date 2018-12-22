// import {Component, OnInit} from '@angular/core';
import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
// export class LayoutComponent implements OnInit {
//
//     constructor() {
//     }
//
//     ngOnInit() {
//     }
//
// }

export class LayoutComponent {
    isCollapsed = false;
    triggerTemplate = null;
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    /** custom trigger can be TemplateRef **/
    changeTrigger(): void {
        this.triggerTemplate = this.customTrigger;
    }
}
