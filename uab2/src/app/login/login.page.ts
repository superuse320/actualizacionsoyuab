import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../servicios/autentificacion.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MensajesService } from '../alertas/mensajes.service';
import { TokenService } from '../servicios/token.service';
export interface Datos {
  user: {
    valor: string,
    validez: string
  },
  pass: {
    valor: string,
    validez: string
  }

}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  db= 'logueo';
  logueo: Datos = { user: { valor: '', validez: '' }, pass: { valor: '', validez: '' } };
  submitted = false;

  constructor(private storage: Storage, private router: Router, private autentificacionService: AutentificacionService,public mensajeService: MensajesService,private token: TokenService) {
   this.initStorage();
   this.deleteStorage();
  }
 async initStorage() {
  await this.storage.create();
   }
   async deleteStorage() {
    if (await this.storage.get(this.db)) {
      await this.storage.remove(this.db);
    }
   }


ingresar(form: NgForm) {
  this.deleteStorage();
  this.submitted = true;
  if (form.valid) {
    const params = {
      username: this.logueo.user.valor,
      password: this.logueo.pass.valor
    };
    console.log('this.logueo: ', params);

    this.mensajeService.presentLoading();
    this.autentificacionService.logueoUser(params).subscribe({
      next: (respuesta: object) => {
        console.log('respuesta: ', respuesta);

        this.storage.set(this.db, respuesta);
        this.mensajeService.dismissLoading();

        // obtener token y mostrarlo
        this.token.getToken().then((token) => {
       this.router.navigateByUrl('/dashboard');

        });

      },
      error: (error: HttpErrorResponse) => {
        console.log('error: ', error);
        this.mensajeService.dismissLoading();
        this.mensajeService.mostrarAlerta('Autentificación', 'Fallo en la autentificación');
      }
    });
  }
}


}
