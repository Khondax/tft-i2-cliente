import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { HomePage, SignupPage } from "../pages";
import { AuthData } from "../../providers/authdata";

import { AngularFire } from "angularfire2";

import _ from 'lodash';

@Component({
    templateUrl: 'login.page.html',
    selector: 'login.page.scss'
})

export class LoginPage {

    loginForm: any;
    usersData: any;

    loading: any;
    
    constructor(public navCtrl: NavController, 
                private menuController: MenuController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private formBuilder: FormBuilder,
                private angularFire: AngularFire,
                private authData: AuthData) {

        this.menuController.enable(false);

        this.loginForm = formBuilder.group({
            dni: [''],
            pass: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    signupUser(){
        this.navCtrl.push(SignupPage);
    }

    loginUser(){

        this.angularFire.database.list('/pedidos').subscribe(data => {
            this.usersData = _.chain(data)
                            .filter(a => a.dni === this.loginForm.value.dni.toUpperCase())
                            .value();

            if (!this.loginForm.valid){
                if (this.loginForm.value.pass.length < 6){
                    let alert = this.alertCtrl.create({
                        message: "La contraseña debe tener al menos 6 caracteres",
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                }
            } else if (this.loginForm.value.dni.length !== 9){
                let alert = this.alertCtrl.create({
                    message: "El DNI no está escrito correctamente.",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();

            } else if (this.usersData.length == 0) {
                console.log("Ningun registro");                
                let alert = this.alertCtrl.create({
                    message: "El DNI solicitado puede no tener pedidos encargados.",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            } else {
                console.log(this.loginForm.value.dni);
                this.authData.loginUser(this.loginForm.value.dni, this.loginForm.value.pass)
                .then(authData => {
                    //this.navCtrl.setRoot(HomePage, this.loginForm.value.dni);
                    this.navCtrl.setRoot(HomePage);
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
        });
        
   }

}
