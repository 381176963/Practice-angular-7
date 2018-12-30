import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    currentComponent: any;
    goLogin = false;
    constructor(private router: Router, private route: ActivatedRoute) {
        this.currentComponent = route.firstChild.component['name'];
        const access_token = localStorage.getItem('access_token');
        if ((access_token === null) || (access_token === '')) {
            this.goLogin = true;
            localStorage.setItem('activated_route_root_snapshot_routerState_url', this.route.root.snapshot['_routerState'].url);
            this.router.navigate(['/login']);
        }
    }

    isCollapsed = false;
    triggerTemplate = null;
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    /** custom trigger can be TemplateRef **/
    changeTrigger(): void {
        console.log(11);
        this.triggerTemplate = this.customTrigger;
    }
}
