import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistSongsPageRoutingModule } from './playlist-songs-routing.module';

import { PlaylistSongsPage } from './playlist-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistSongsPageRoutingModule
  ],
  declarations: [PlaylistSongsPage]
})
export class PlaylistSongsPageModule {}
