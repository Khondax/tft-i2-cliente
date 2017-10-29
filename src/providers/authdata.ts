import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {

    userAuth: any;

    constructor(public angularFire: AngularFire) {
        angularFire.auth.subscribe(user => {
            if (user){
                this.userAuth = user.auth;
            }
        })
    }

    getCurrentUid(){
        return this.angularFire.auth.getAuth().auth.uid;
    }

    getCurrentDni(){
        let dni = this.angularFire.auth.getAuth().auth.email;
        return dni;
    }

    loginUser(dni: string, pass: string): firebase.Promise<any> {
        let string = dni + "@cliente.es"
        return this.angularFire.auth.login({
            email: string,
            password: pass
        });
    }

    logoutUser(): firebase.Promise<any> {
        return this.angularFire.auth.logout();
    }

}