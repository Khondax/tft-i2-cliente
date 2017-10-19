import { Injectable } from '@angular/core';

@Injectable()
export class AuthData {

    userAuth: any;

    constructor() {
        this.userAuth = "";
    }

    getCurrentDni(){
        return this.userAuth;
    }

    loginUser(dni: string) {
        this.userAuth = dni;
    }

    logoutUser() {
        this.userAuth = "";
    }

}