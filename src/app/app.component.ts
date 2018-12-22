import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public loginStatus: boolean;

    constructor (private router: Router) {
        console.log(111);
        const access_token = localStorage.getItem('access_token');
        if ((access_token === null) || (access_token === '')) {
            this.loginStatus = false;
            this.router.navigate(['/login']);
        } else {
            this.loginStatus = true;
        }
    }
}
