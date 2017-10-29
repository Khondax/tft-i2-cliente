import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, HomePage, RegistryPage } from '../pages/pages';
import { AuthData } from '../providers/authdata';
import { AngularFire } from 'angularfire2';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    constructor(public platform: Platform,
                public angularFire: AngularFire,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public authData: AuthData,
                private pageTransition: NativePageTransitions) {
                    
        const authObserver = angularFire.auth.subscribe(user => {
            if(user){
                this.rootPage = HomePage;
                authObserver.unsubscribe();
            } else {
                this.rootPage = LoginPage;
            }
        });
        
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

    goHome(){
        let view = this.nav.getActive();
        if (view.component.name != "HomePage"){
            let options: NativeTransitionOptions = {
                origin: 'left',
                action: 'open',
                duration: 300
            };
    
            this.pageTransition.drawer(options);
    
            this.nav.push(HomePage);
        }
    }

    goToRegistry(){
         let options: NativeTransitionOptions = {
            direction: 'up',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 60
        };

        this.pageTransition.slide(options);

        this.nav.push(RegistryPage);
    }

    logout(){
        this.authData.logoutUser();
        this.nav.push(LoginPage);
    }

}
