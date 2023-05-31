import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColegiosPageRoutingModule } from './colegios-routing.module';

import { ColegiosPage } from './colegios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColegiosPageRoutingModule
  ],
  declarations: [ColegiosPage]
})
export class ColegiosPageModule {}
