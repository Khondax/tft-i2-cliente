import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthData } from '../../providers/authdata';

import { AngularFire } from "angularfire2";

import _ from 'lodash';

 @Component ({
     templateUrl: 'registry.page.html',
     selector: 'registry.page.scss'
 })

 export class RegistryPage {

    orders = [];
    queryText: string = "";
    allData: any;

    constructor(public nav: NavController,
                public alertController: AlertController,
                public angularFire: AngularFire,
                public loadingController: LoadingController,
                private authData: AuthData){

    }

    ionViewDidLoad(){

        let loader = this.loadingController.create ({
            content: 'Obteniendo datos...',
            spinner: 'bubbles'
        });

        loader.present().then(() => {

            this.angularFire.database.list('/pedidos').subscribe(data => {
                this.allData = _.chain(data)
                               .filter(a => a.dni === this.authData.getCurrentDni())
                               .orderBy('fechaEntrega', 'desc')
                               .groupBy(fecha => fecha.fechaEntrega.split('T)').shift())
                               .toPairs()
                               .map(item => _.zipObject(['date', 'order'], item))
                               .value();

                this.orders = _.chain(this.allData)
                              .orderBy('date', 'desc')
                              .value();

                loader.dismiss();

            });
        });

    }

    search(){
        let queryTextLower = this.queryText.toLowerCase();
        let filteredOrders = [];
        
        _.forEach(this.allData, dat => {
            let orders = _.filter(dat.order, or => (<any>or).repartidor.toLowerCase()
            .includes(queryTextLower) || (<any>or).fechaEntrega.toLowerCase()
            .includes(queryTextLower) || (<any>or).remitente.toLowerCase()
            .includes(queryTextLower) || (<any>or).idPaquete.toString().includes(queryTextLower));
            if (orders.length) {
                filteredOrders.push({ date: dat.date, order: orders});
            }
        });

        this.orders = filteredOrders;
    }


 }