import { Component, OnInit } from '@angular/core';
import { ApisService } from '../servicios/apis.service';
import { TokenService } from '../servicios/token.service';
import { AlertController } from '@ionic/angular';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { from } from 'rxjs';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  hasRol="";
  hasIdSchool="";
  public lista1: any[];
  public filteredLista1: any[];
  public searchTerm: string;
  public isLoading: boolean;

  constructor(private api: ApisService, private token: TokenService, private alertController: AlertController) {
    this.lista1 = [];
    this.filteredLista1 = [];

    this.searchTerm = '';
    this.isLoading = false;


  }

  ngOnInit() {
    this.isLoading = true;
    this.token.getToken().then((token) => {
      this.api.getPrivate(token, 'estudiantes', 'get').subscribe((data: any) => {
        this.obtenerRol();
        this.cargarDatos(data['data']);
        this.isLoading = false;

      });
    });
  }
  private  obtenerRol(){
    this.token.getRol().then((token) => {
      this.hasRol=token;
      this.ValidarRol();
       });
  }
private async ValidarRol() {
  const token = await this.token.getToken();

  if (this.hasRol === "Director") {
    const data = await firstValueFrom(from(this.api.getPrivate(token, 'micolegio', 'get')));
    if (typeof data === 'object' && 'data' in data) {
      const idsSchool = (data['data'] as any[]).map((estudiante: any) => estudiante['id']);
      const estudiantes = await firstValueFrom(from(this.api.getPrivate(token, 'estudiantes', 'get')));
      if (typeof estudiantes === 'object' && 'data' in estudiantes && Array.isArray(estudiantes['data'])) {
        this.lista1 = estudiantes['data'].filter((estudiante: any) => idsSchool.includes(estudiante['school_id']));
        console.log("estudiantes mis", this.lista1.map((estudiante: any) => estudiante['first_name']));
      }
    }
  } else {
    const estudiantes = await firstValueFrom(from(this.api.getPrivate(token, 'estudiantes', 'get')));
    if (typeof estudiantes === 'object' && 'data' in estudiantes && Array.isArray(estudiantes['data'])) {
      this.lista1 = estudiantes['data'];
    }
  }
}
  private cargarDatos(datos: any): void {
    const sortedData = Object.values(datos).sort((a: any, b: any) => {
      return b.score - a.score;
    });

    this.lista1 = sortedData;
    this.filteredLista1 = sortedData;
  }

  public search(): void {
    const term = this.searchTerm.toLowerCase();

    if (term.trim() === '') {
      this.filteredLista1 = this.lista1;
    } else {
      this.filteredLista1 = this.lista1.filter((estudiantes) =>
        estudiantes.first_name.toLowerCase().includes(term)
      );
    }

    console.log(this.filteredLista1);
    console.table(this.filteredLista1);
  }
  async showEstudiantes(estudiantes: any) {
    const alert = await this.alertController.create({
      header: estudiantes.name,
      message: `Credencial: ${estudiantes.first_name
      } `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
