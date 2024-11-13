import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistSongsPage } from './playlist-songs.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistSongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistSongsPageRoutingModule {}
