import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { TabBarComponent } from 'src/app/components/tab-bar/tab-bar.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PrincipalPageRoutingModule],
  declarations: [PrincipalPage, TabBarComponent],
})
export class PrincipalPageModule {}
