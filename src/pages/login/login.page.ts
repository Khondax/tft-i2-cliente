import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { HomePage } from "../pages";

import { AngularFire } from "angularfire2";

import _ from 'lodash';

@Component({
    templateUrl: 'login.page.html',
    selector: 'login.page.scss'
})

export class LoginPage {

    loginForm: any;
    usersData: any;
    
    constructor(public navCtrl: NavController, 
                private menuController: MenuController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private formBuilder: FormBuilder,
                private angularFire: AngularFire) {

        this.menuController.enable(false);

        this.loginForm = formBuilder.group({
            dni: ['']
        });
    }

    loginUser(){

        this.angularFire.database.list('/pedidos').subscribe(data => {
            this.usersData = _.chain(data)
                            .filter(a => a.dni === this.loginForm.value.dni)
                            .value();
                            
            if(this.loginForm.value.dni.length < 9){
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
                this.navCtrl.setRoot(HomePage, this.loginForm.value.dni);
            }

        });

        
    }

}
