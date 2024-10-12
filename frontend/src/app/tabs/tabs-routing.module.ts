import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersPageModule),
      },
      {
        path: 'songs',
        loadChildren: () => import('../songs/songs.module').then(m => m.SongsPageModule),
      },
      {
        path: 'artists',
        loadChildren: () => import('../artists/artists.module').then(m => m.ArtistsPageModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
