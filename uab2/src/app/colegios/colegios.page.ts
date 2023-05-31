import { Component, OnInit } from '@angular/core';
import { ApisService } from '../servicios/apis.service';
import { TokenService } from '../servicios/token.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.page.html',
  styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage implements OnInit {
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
      this.api.getPrivate(token, 'colegios', 'get').subscribe((data: any) => {
        this.cargarDatos(data['data']);
        this.isLoading = false;

      });
    });
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
      this.filteredLista1 = this.lista1.filter((colegio) =>
        colegio.name.toLowerCase().includes(term)
      );
    }

    console.log(this.filteredLista1);
    console.table(this.filteredLista1);
  }
  async showColegio(colegio: any) {
    const alert = await this.alertController.create({
      header: colegio.name,
      message: `Director: ${colegio.principal_first_name} ${colegio.principal_last_name}  \r \n  Capellan: ${colegio.chaplain_first_name} ${colegio.chaplain_last_name}  \r \n  Estudiantes: ${colegio.total_students} \r \n  Puntaje: ${colegio.score} \r \n   Telefono: ${colegio.phone_number
      }  \r\n\t Credencial: ${colegio.user.username
      } `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
