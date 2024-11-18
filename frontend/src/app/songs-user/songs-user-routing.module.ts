import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsUserPage } from './songs-user.page';

const routes: Routes = [
  {
    path: '',
    component: SongsUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsUserPageRoutingModule {}
