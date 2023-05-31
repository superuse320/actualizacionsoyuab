import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor( private http: HttpClient,private storage: Storage,private token :TokenService) {




  }



  public logueoUser(data: object): Observable<object>{

    return this.http.post(environment.BASE_URL+'login',data);
  }
 public getpermissions(token:string): Observable<object>{
  return this.http.get(environment.BASE_URL+'v1/permissions', this.token.getCabecera(token));
}


}
