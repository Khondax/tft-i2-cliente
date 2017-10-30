import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginPage } from "../pages";
import { AuthData } from "../../providers/authdata";

import { AngularFire } from "angularfire2";

import _ from 'lodash';

@Component({
    templateUrl: 'signup.page.html',
    selector: 'signup.page.scss'
})

export class SignupPage {
  
    signupForm: any;
    loading: any;

    constructor(public navCtrl: NavController, 
                private menuController: MenuController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private formBuilder: FormBuilder,
                private angularFire: AngularFire,
                private authData: AuthData) {

        this.menuController.enable(false);

        this.signupForm = formBuilder.group({
            name: [''],
            dni: [''],
            pass: ['', Validators.compose([Validators.minLength(6), Validators.required])]            
        });

    }

    signupUser(){

        this.angularFire.auth.createUser({
            email: this.signupForm.value.dni + "@cliente.es",
            password: this.signupForm.value.pass,
        }).then(data => {
            this.navCtrl.setRoot(LoginPage);
        }, error => {
            this.loading.dismiss().then( () => {
                let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        });

        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
        });

        this.loading.present();

    }

    backLogin(){
        this.navCtrl.popToRoot();
    }


}
