import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoginPageModule } from '../login/login.module';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
     }
  async getToken(){
    let token = await this.storage.get('logueo');
    if (token != null) {
      return token.token;
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.getToken());
        }, 1000);
      });
    }
  }
  async getRol(){
    let rol = await this.storage.get('logueo');
    if (rol != null) {
      return rol.rol;
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.getRol());
        }, 1000);
      });
    }
  }
  public getCabecera(token:string): object{

    return {
      headers: new HttpHeaders({

        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token

      })
    };
  }
}
