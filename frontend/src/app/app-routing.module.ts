import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirige al login al inicio
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'create-users',
    loadChildren: () => import('./create-users/create-users.module').then(m => m.CreateUsersPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsPageModule)
  },
  {
    path: 'songs',
    loadChildren: () => import('./songs/songs.module').then(m => m.SongsPageModule)
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./update-user/update-user.module').then(m => m.UpdateUserPageModule)
  },
  {
    path: 'create-songs',
    loadChildren: () => import('./create-songs/create-songs.module').then(m => m.CreateSongsPageModule)
  },
  {
    path: 'update-song/:id',
    loadChildren: () => import('./update-song/update-song.module').then(m => m.UpdateSongPageModule)
  },
  {
    path: 'login',  // Asegúrate de que la ruta login esté definida
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then( m => m.PlaylistPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
