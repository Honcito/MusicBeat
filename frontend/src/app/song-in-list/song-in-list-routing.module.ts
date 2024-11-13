import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongInListPage } from './song-in-list.page';

const routes: Routes = [
  {
    path: '',
    component: SongInListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongInListPageRoutingModule {}
