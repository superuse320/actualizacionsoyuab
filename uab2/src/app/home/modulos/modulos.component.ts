import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss'],
})
export class ModulosComponent  implements OnInit {

  constructor(private platform: Platform, private alertController: AlertController,   private router: Router,) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.presentAlertConfirm();
    });
   }

  ngOnInit() {}
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
  clickAddTodo() {
    this.router.navigateByUrl('/uab-eventos');
  }
  clickSociales() {
    this.router.navigateByUrl('/sociales');
  }
  carreras(){
    this.router.navigateByUrl('ingreso/carreras');
  }
  uab(){
    this.router.navigateByUrl('ingreso/uab');
  }
  iglesia(){
    this.router.navigateByUrl('ingreso/iglesia');
  }
  colegio(){
    this.router.navigateByUrl('ingreso/colegio');
  }
  encuestas(){
    this.router.navigateByUrl('ingreso/encuestas');
  }
  noticias(){
    this.router.navigateByUrl('ingreso/noticias');
  }
  iasd(){
    this.router.navigateByUrl('ingreso/iasd');
  }
  cargarPagina(){

    // this.eventosSrv.getRedes_p().subscribe((res: object)=>{

    //   console.log("redes: ",res);
    //   this.mostrarRedes( res['data'] );
    // });
  }
  mostrarRedes(){
  //   redes.forEach(element => {
  //     console.log("Redes sociales"+element['key']);

  //     if(element['key']==='pagina'){
  //       this.pagina=element['value'];
  //     }
  //   });
  //   console.log("pagina: ",this.pagina);
  // }
}

}

