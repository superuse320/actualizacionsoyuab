
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {


  constructor(private http: HttpClient,private TokenService:TokenService) { }

//MEtodo para obtener datos de la api
 getData(endpoint: string,tipo: string,token:string,peticion:string) {
  const url = environment.BASE_URL + tipo + endpoint;
  if(token=="null"){
    switch (peticion) {
      case 'post':

        return this.http.post(url, {});

      case 'put':

        return this.http.put(url, {});

      case 'delete':
        return this.http.delete(url);

      default:
        return this.http.get(url);
    }



  }else{

  const headers= this.TokenService.getCabecera(token);
  switch (peticion) {
    case 'post':

      return this.http.post(url, headers);

    case 'put':

      return this.http.put(url, headers);

    case 'delete':
      return this.http.delete(url);

    default:
      return this.http.get(url,headers);
  }


  }



}

//Apis Publicas
getPublicData(dataType: string,peticion:string) {
  let endpoint = '';
  let tipo='public/';

  switch (dataType) {
    case 'ubicacion':
      endpoint = 'venues';
      break;
    case 'galerias':
      endpoint = 'galleries';
      break;
    case 'programacion':
      endpoint = 'schedules';
      break;
    case 'actividades':
      endpoint = 'speakers';
      break;
    case 'live':
      endpoint = 'live';
      break;
    case 'chat':
      endpoint = 'chat';
      break;
    case 'pedidos':
      endpoint = 'pedido_oracion';
      break;
    case 'preguntas':
      endpoint = 'faqs';
      break;
    case 'material':
      endpoint = 'material';
      break;
    case 'ajustes':
      endpoint = 'settings';
      break;

  }
  return this.getData(endpoint,tipo,"null",peticion);

}


getPrivate(token:string,dataType: string,peticion:string) {

  let endpoint = '';
  let tipo='v1/';
  switch (dataType) {
    case 'patrocinadores':
      endpoint = 'sponsors';
      break;

    case 'colegios':
      endpoint = 'schools';
      break;
    case 'micolegio':
      endpoint = 'schools/my/school';
      break;
    case 'estudiantes':
      endpoint = 'students';
      break;
    case 'contenido':
      endpoint = 'amenities';
      break;
    case 'preguntas':
      endpoint = 'faqs';
      break;
    case 'galeria':
      endpoint = 'galleries';
      break;
    case 'programacion':
      endpoint = 'schedules';
      break;
    case 'material':
      endpoint = 'material';
      break;


  }
  return this.getData(endpoint,tipo,token,peticion);

}



public getMisEstudiantes(token:string): Observable<object>{
  return this.http.get(environment.BASE_URL+'v1/students',  this.TokenService.getCabecera(token));
}
public registroIngreso(datos: object,token:string): Observable<object>{

  return this.http.post(environment.BASE_URL+"v1/students/check-in",datos, this.TokenService.getCabecera(token));
}



//Envio Datos
public enviarPedido(data: object): Observable<object>{

  return this.http.post(environment.BASE_URL+'public/pedido_oracion',data);
}
public enviarFoto(data: object): Observable<object>{

  return this.http.post(environment.BASE_URL+'public/reto',data);
}
}

