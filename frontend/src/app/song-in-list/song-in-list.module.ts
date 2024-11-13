
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongInListPageRoutingModule } from './song-in-list-routing.module';

import { SongInListPage } from './song-in-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    SongInListPageRoutingModule
  ],
  declarations: [SongInListPage]
})
export class SongInListPageModule {}
