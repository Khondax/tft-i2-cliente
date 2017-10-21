import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage, LoginPage, MapPage, OrderPage, RegistryPage } from "../pages/pages";
import { AuthData } from '../providers/authdata';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";

import { NativePageTransitions } from "@ionic-native/native-page-transitions";

import { GoogleMaps } from "@ionic-native/google-maps";

export const firebaseConfig = {
  apiKey: "AIzaSyDka8ZQF6bzjPhVJMZFAf7d0BBztxP_spg",
  authDomain: "app-repartos-tft.firebaseapp.com",
  databaseURL: "https://app-repartos-tft.firebaseio.com",
  projectId: "app-repartos-tft",
  storageBucket: "app-repartos-tft.appspot.com",
  messagingSenderId: "1059307361256"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage,
    OrderPage,
    RegistryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage,
    OrderPage,
    RegistryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    AuthData,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
