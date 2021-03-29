import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js'

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }
  static auth: any = {
    loggedIn: false
  };
  static initOptions = {
    url: 'http://localhost:8080/auth', realm: 'quarkus', clientId: 'angular-fe'
  }
  static keycloak = Keycloak(KeycloakService.initOptions)

  static init(): Promise<any> {

    return new Promise((resolve, reject) => {
      KeycloakService.keycloak.init({ onLoad: 'login-required' })
        .success(() => {
          console.log(KeycloakService.keycloak);
          KeycloakService.auth.loggedIn = true;
          resolve(KeycloakService.keycloak);
        })
        .error((err) => {
          reject(err);
        });
    });
  }

  static logout() {
    console.log('**  LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.keycloak.logout();
  }
}
