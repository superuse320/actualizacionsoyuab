

import { Component,OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { TokenService } from '../servicios/token.service';
import { ApisService } from '../servicios/apis.service';
import { MensajesService } from '../alertas/mensajes.service';
import { HttpClient } from '@angular/common/http';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from 'ng-connection-service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements OnInit, OnDestroy {
  isConnected = false;
  isLoading = true;
  progress = 0;

  status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();

  constructor(private storage: Storage,private connectionService: ConnectionService,    private msjSrv: MensajesService,private router: Router,
    private ApisService: ApisService,private token: TokenService,) {

  }

  ngOnInit(): void {
    this.loadAndRedirect();
    // this.subscription.add(
    //   this.connectionService.monitor().pipe(
    //     tap((newState: ConnectionState) => {
    //       this.currentState = newState;

    //       if (this.currentState.hasNetworkConnection) {
    //         this.status = 'ONLINE';
    //         this.loadAndRedirect();
    //       } else {
    //         this.status = 'OFFLINE';
    //         this.msjSrv.mostrarAlerta('Conexion ','Verifique la conexion a internet de su dispositivo');
    //         this.isLoading = false;
    //       }
    //     })
    //   ).subscribe()
    // );
  }

  loadAndRedirect() {
    const loader = document.querySelector('.loader');
    loader?.addEventListener('animationend', () => {
    this.storage.get('logueo').then(value => {
      if (value === null || value === undefined) {

    this.ApisService.getPublicData('ajustes','get').subscribe({
      next: (respuesta: any) => {
        console.log('respuesta: ', respuesta);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.log('error: ', error);
        this.isLoading = false;
        this.msjSrv.mostrarAlerta('Servidor','Error de conexion con el servidor');
      }
    });
      } else {
        this.router.navigate(['/dashboard']);

      }
    }).catch(error => {
    this.msjSrv.mostrarAlerta('Error','Error al cargar los datos de usuario');
    });




    });


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
