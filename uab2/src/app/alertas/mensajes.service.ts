import { Injectable } from '@angular/core';
import { AlertController,LoadingController,ToastController  } from '@ionic/angular';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { App } from '@capacitor/app';
@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private loading?: HTMLIonLoadingElement;
  private isLoading?: boolean;
  constructor( private alertController: AlertController,private loadingController: LoadingController,  private toast: ToastController,) {

   }
   async presentAlertSwal() {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario y/o contraseña incorrectos',
      confirmButtonText: 'OK'
    });
  }
   async mostrarToast(mensaje: string){
    const msjToast = await this.toast.create({
      message: mensaje
    });
    msjToast.present();
  }
  async mostrarToastTime( mensaje: string, tiempo: number ){
    const msjToast = await this.toast.create({
      message: mensaje,
      duration: tiempo
    });
    msjToast.present();
  }

  public ocultarToast(): void{
    this.toast.dismiss();
  }
  async mostrarAlerta( titulo: string, mensaje: string ){
    const msjAlerta = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [{ text:'Aceptar', cssClass:'cancel' }],
      cssClass: 'msjStyle'
    });
    await msjAlerta.present();
  }
  async mostrarCargando( mensaje: string= 'Cargando ...' ){
    this.isLoading = true;
    return await this.loadingController.create({
      message: mensaje,
      spinner: 'circles',
      cssClass: 'msjStyle',
      backdropDismiss: true
    }).then(a=>{
      a.present().then(()=>{
        if( !this.isLoading ){
          a.dismiss().then(()=>console.log('salio del loading'));
        }
      });
    });
  }
  async ocultarCargando(){
    this.isLoading = false;
    return await this.loadingController.getTop().then(a=>{
      if(a){
        a.dismiss().then(()=>console.log('salio loading'));
      }
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Autenticando...',
      spinner: 'circular',
      cssClass: 'my-custom-class'
    });
    await this.loading.present();
  }
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Fallo al autenticarse',
      message: 'Usuario y/o contraseña incorrectos',
      buttons: ['OK']
    });

    await alert.present();
  }
   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Quieres salir de la app?',
      message: 'Si sales, tendrás que volver a iniciar sesión.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salir',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
