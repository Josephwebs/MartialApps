import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesDetallePageRoutingModule } from './clases-detalle-routing.module';
import { TabBarComponent } from 'src/app/components/tab-bar/tab-bar.component';

import { ClasesDetallePage } from './clases-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesDetallePageRoutingModule,
  ],
  declarations: [ClasesDetallePage, TabBarComponent],
})
export class ClasesDetallePageModule {}
