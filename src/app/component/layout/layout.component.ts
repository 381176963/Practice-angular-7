import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    constructor(private router: Router) {
        const access_token = localStorage.getItem('access_token');
        if ((access_token === null) || (access_token === '')) {
            this.router.navigate(['/login']);
        }
    }

    isCollapsed = false;
    triggerTemplate = null;
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    /** custom trigger can be TemplateRef **/
    changeTrigger(): void {
        this.triggerTemplate = this.customTrigger;
    }
}
