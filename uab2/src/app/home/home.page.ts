import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { OnInit } from '@angular/core';
import { MensajesService } from '../alertas/mensajes.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private platform: Platform, private alertController: AlertController,   private router: Router,public mensajeService: MensajesService) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.mensajeService.presentAlertConfirm();
    });
   }

  ngOnInit() {}

  clickAddTodo() {
    this.router.navigateByUrl('/uab-eventos');
  }
  clickEntrar(){
    this.router.navigateByUrl('/login');
  }

}
