import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, HomePage, RegistryPage } from '../pages/pages';
import { AuthData } from '../providers/authdata';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public authData: AuthData) {
                    
        if(this.authData.userAuth != "") {
            this.rootPage = HomePage;
        } else {
            this.rootPage = LoginPage;
        }
        
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
  }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    goToRegistry(){
        this.nav.push(RegistryPage);
    }

    logout(){
        this.authData.logoutUser();
    }

}
