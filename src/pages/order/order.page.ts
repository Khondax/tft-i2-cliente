import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
    templateUrl: 'order.page.html',
    selector: 'order.page.scss'
})
export class OrderPage {

    orderData: any;
    orderObs: FirebaseListObservable<any>;

    constructor(public nav: NavController, 
                private navParams: NavParams,
                private alertController: AlertController,
                private angularFire: AngularFire,
                private toastController: ToastController,
                private view: ViewController) {

        
        this.orderData = this.navParams.data;

    }

    ionViewDidLoad(){
        this.orderObs = this.angularFire.database.list('/pedidos');
    }

    addName(){
        let prompt = this.alertController.create({
            title: 'Nuevo nombre',
            message: "¿Desea introducir un nombre para el pedido seleccionado?",
            inputs: [{
                type: 'text',
                name: 'nombre'
            }],
            buttons: [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Añadir',
                    handler: data => {
                        this.orderObs.update(this.orderData.$key, {nombre: data.nombre});

                        let toast = this.toastController.create({
                            message: "Se ha registrado el nombre",
                            duration: 4000,
                            position: 'bottom'
                        });

                        toast.present();
                    }
                }
            ]

        });
        prompt.present();
    }

    goBack(){
        this.view.dismiss();
    }

}
