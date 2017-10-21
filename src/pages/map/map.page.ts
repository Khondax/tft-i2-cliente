import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';
import { AngularFire } from "angularfire2";

import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, CameraPosition, MarkerOptions, Marker, MarkerCluster } from "@ionic-native/google-maps";

@Component({
    templateUrl: 'map.page.html',
    selector: 'map.page.scss'
})
export class MapPage {

    orderTrack: any;
    map: GoogleMap;
    mapElement: HTMLElement;
    delivererData: any;

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private googleMaps: GoogleMaps,
                private angularFire: AngularFire) {


        this.orderTrack = this.navParams.data;
    }

    ionViewDidLoad(){
        
        this.loadMap();
    }
    
    loadMap(){

        this.mapElement = document.getElementById('map');

        var mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.orderTrack.latitud,
                    lng: this.orderTrack.longitud
                },
                zoom: 12,
                tilt: 10
            }
        }
        
        this.angularFire.database.list('/repartidores').subscribe(data => {
            this.delivererData = _.chain(data)
                                 .filter(a => a.$key === this.orderTrack.idRepartidor)
                                 .value();
            
            this.map = this.googleMaps.create(this.mapElement, mapOptions);

            this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                if (this.orderTrack.nombre != ""){
                    this.map.addMarker({
                        title: this.orderTrack.nombre,
                        icon: 'blue',
                        animation: 'DROP',
                        position: {
                            lat: this.delivererData[0].latitud,
                            lng: this.delivererData[0].longitud
                        }
                    });
                }
            });

        });

    }

    ionViewDidLeave(){
        this.map.remove();
    }



}
