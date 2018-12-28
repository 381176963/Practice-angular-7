import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './component/login/login.component';
import {LayoutComponent} from './component/layout/layout.component';
import {HomeComponent} from './component/home/home.component';
import {PictureIndexComponent} from './component/picture-index/picture-index.component';
import {PictureInfoComponent} from './component/picture-info/picture-info.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'layout',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'picture-index', component: PictureIndexComponent},
            {path: 'picture-info', component: PictureInfoComponent},
        ]
    },
    {
        path: '**',
        redirectTo: '/layout/home'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
