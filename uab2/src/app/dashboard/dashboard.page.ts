import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ColegiosPage } from '../colegios/colegios.page';
import { PrincipalPage } from '../principal/principal.page';
import { Storage } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenService } from '../servicios/token.service';
import { ApisService } from '../servicios/apis.service'
import { Router } from '@angular/router';
import { MyschoolService } from '../servicios/myschool.service';
import { EstudiantesPage } from '../estudiantes/estudiantes.page';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class DashboardPage implements OnInit {
  cardContent:any;
  principalContent= PrincipalPage;
   // Declare the cardContent property
  iglesiaContent = "Contenido de la iglesia";
  miscolegiosContent = ColegiosPage;
  estudiantesContent=EstudiantesPage;
  carrerasContent = "Contenido de carreras";
  hasRol="";
  hasResponseSchool=false;
  hasResponseMYSchool=false;
  encuestasContent = "Contenido de encuestas";
  clickSocialesContent = "Contenido de contactos";
  noticiasContent = "Contenido de noticias";
  iasdContent = "Contenido de IASD";
  navExpanded = false;
  constructor( private router: Router,private token: TokenService,private storage: Storage,private api:ApisService,private myschool:MyschoolService) {
    this.token.initStorage();
    this.getTokenAndGetDataSchool();
    this.getTokenAndGetDataMySchool();
    this.getRol();
  }

  ngOnInit() {
    this.verificarStorage();

  this.cardContent = this.principalContent;
  }
  async verificarStorage() {
    if (await this.storage.get('logueo')) {
    console.log('logueo: ', await this.storage.get('logueo'));
    }else
    {
 this.router.navigateByUrl('/login');
    }
   }
  toggleNav() {
    this.navExpanded = !this.navExpanded;

  }

  public unirseChat(): void{

   }
   principal(){
    this.cardContent = this.principalContent;
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

  iglesia(){
    this.cardContent = this.iglesiaContent;
  }
  miscolegios(){
    this.cardContent = this.miscolegiosContent;
   }
  colegio(){
    this.router.navigateByUrl('ingreso/colegio');
  }
  estudiantes(){
    this.cardContent = this.estudiantesContent;
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
  getTokenAndGetDataSchool() {
    this.token.getToken().then((token) => {
      this.api.getPrivate(token, 'colegios', 'get').subscribe((data: any) => {
        // this.cargarDatos(data['data']);
        console.log('data: ', data['data']);
        this.hasResponseSchool = true; // Establecer la variable en true si hay respuesta de la API
      });
    });
  }
  getRol() {
    this.token.getRol().then((token) => {
   this.hasRol=token;
    });
  }
  getTokenAndGetDataMySchool() {
    this.myschool.getSchools().then((token) => {
      this.token.getToken().then((token2) => {
        this.api.getPrivate(token2, 'estudiantes', 'get').subscribe((data: any) => {
          // this.cargarDatos(data['data']);
          console.log('data: ', data['data']);
          this.hasResponseMYSchool = true; // Establecer la variable en true si hay respuesta de la API

        });

      });
    });
  }


}
