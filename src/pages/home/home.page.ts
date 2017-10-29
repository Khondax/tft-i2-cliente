import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, ModalController } from 'ionic-angular';

import { MapPage, OrderPage } from "../pages";

import { AngularFire } from "angularfire2";

import _ from 'lodash';

import { AuthData } from '../../providers/authdata';

@Component({
    templateUrl: 'home.page.html',
    selector: 'home.page.scss'
})

export class HomePage {

    userDni: string;
    userData: any = {};
    allOrders = [];
    queryText: string = "";    

    constructor(private nav: NavController,
                private authData: AuthData,
                private loadingController: LoadingController,
                private menuController: MenuController,
                private angularFire: AngularFire,
                private modalCtrl: ModalController) {

        this.menuController.enable(true);

        this.userDni = this.authData.getCurrentDni().split('@').shift().toUpperCase();
    }

    ionViewDidLoad(){
        
        let loader = this.loadingController.create({
            content: 'Obteniendo datos...',
            spinner: 'bubbles'
        });
        
        loader.present().then(() => {
            this.angularFire.database.list('/pedidos').subscribe(data =>{
                this.userData = _.chain(data)
                                .filter(a => a.dni === this.userDni && a.estado != "Entregado")
                                .orderBy('fechaEntradaAlmacen')
                                .value();
    
                this.allOrders = this.userData;

            });
            
            loader.dismiss();
            
        });
    }

    goToMap($event, order){
        this.nav.push(MapPage, order);
    }

    goToOrder($event, order){

        let modal = this.modalCtrl.create(OrderPage, order);
        modal.present();

    }

    refresh(refresher){
        refresher.complete();
        this.ionViewDidLoad();
    }

    getIcon(order){
        return (order.estado === "En reparto" || order.estado === "Siguiente en entrega") ? 'assets/img/ruta.jpg' : 'assets/img/almacen.png';
    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();

        let orders = _.filter(this.userData, or => (<any>or).remitente.toLowerCase()
        .includes(queryTextLower) || (<any>or).idPaquete.toString().includes(queryTextLower));

        this.allOrders = orders;
    }

}
