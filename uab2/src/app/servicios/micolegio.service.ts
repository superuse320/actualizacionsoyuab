import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class MicolegioService {

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
     }
  async getSchools(){
    let school = await this.storage.get('logueo');
    if (school != null) {
      return school.school;
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.getSchools());
        }, 1000);
      });
    }
  }

}
