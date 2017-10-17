import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';

import { MapPage } from "../pages";

import { AngularFire } from "angularfire2";

import _ from 'lodash';

@Component({
    templateUrl: 'home.page.html',
    selector: 'home.page.scss'
})

export class HomePage {

    userDni: string;
    userData: any = {};
    allOrders = [];

    constructor(private nav: NavController,
                private navParams: NavParams, 
                private loadingController: LoadingController,
                private menuController: MenuController,
                private angularFire: AngularFire) {

        this.menuController.enable(true);
        this.userDni = this.navParams.data;
        
    }

    ionViewDidLoad(){
        
        let loader = this.loadingController.create({
            content: 'Obteniendo datos...',
            spinner: 'bubbles'
        });
        
        loader.present().then(() => {
            this.angularFire.database.list('/pedidos').subscribe(data =>{
                this.userData = _.chain(data)
                                .filter(a => a.dni === this.userDni)
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

    refresh(refresher){
        refresher.complete();
        this.ionViewDidLoad();
    }

}
