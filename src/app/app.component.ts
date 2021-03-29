import { Component } from '@angular/core';
import { KeycloakService } from "./keycloak.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  info = '';
  constructor(private http: HttpClient) { }
  logout(): void {
    console.log("logout")
    KeycloakService.logout()
  }

  me(): void {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + KeycloakService.keycloak.token
    });
    this.http.get("http://localhost:8081/api/users/me", { headers: reqHeader }).toPromise().then((e) => this.info = JSON.stringify(e))
  }
}
