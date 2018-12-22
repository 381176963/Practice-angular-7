import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';

const routes: Routes = [
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: '/Login'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
