import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsUserPage } from './tabs-user.page';

const routes: Routes = [
  {
    path: '',
    component: TabsUserPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'songs-user',
        loadChildren: () => import('../songs-user/songs-user.module').then(m => m.SongsUserPageModule),
      },
      {
        path: 'playlists',
        loadChildren: () => import('../playlist/playlist.module').then(m => m.PlaylistPageModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs-user/home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsUserPageRoutingModule {}
