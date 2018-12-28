import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import { IconDefinition } from '@ant-design/icons-angular';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';

import { QuillModule } from 'ngx-quill';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { PictureIndexComponent } from './component/picture-index/picture-index.component';
import { PictureInfoComponent } from './component/picture-info/picture-info.component';

const icons: IconDefinition[] = [ LockOutline, UserOutline ];

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        LayoutComponent,
        PictureIndexComponent,
        PictureInfoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        QuillModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
        { provide: NZ_ICONS, useValue: icons }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
