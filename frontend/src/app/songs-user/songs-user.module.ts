import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsUserPageRoutingModule } from './songs-user-routing.module';

import { SongsUserPage } from './songs-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsUserPageRoutingModule
  ],
  declarations: [SongsUserPage]
})
export class SongsUserPageModule {}
