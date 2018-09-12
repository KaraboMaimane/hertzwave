import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DatabaseProvider } from '../providers/database/database';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { IdentityPage } from '../pages/identity/identity';
import { ProfilePage } from '../pages/profile/profile';
import { EditPage } from '../pages/edit/edit';
import { TrackUploadPage } from '../pages/track-upload/track-upload';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    LoginPage,
    RegisterPage,
    IdentityPage,
    ProfilePage,
    EditPage,
    TrackUploadPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriesPage,
    LoginPage, 
    RegisterPage,
    IdentityPage,
    ProfilePage,
    EditPage,
    TrackUploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
