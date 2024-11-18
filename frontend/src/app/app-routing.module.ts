
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
    path: 'tabs-user',
    loadChildren: () => import('./tabs-user/tabs-user.module').then(m => m.TabsUserPageModule)
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
  },
  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then( m => m.PlaylistPageModule)
  },
  {
    path: 'song-in-list/:playlistId',  // Nueva ruta para las canciones
    loadChildren: () => import('./song-in-list/song-in-list.module').then(m => m.SongInListPageModule)
  },
  {
    path: 'playlist-songs/:playlistId',  // Usamos el ID de la playlist para obtener las canciones
    loadChildren: () => import('./playlist-songs/playlist-songs.module').then(m => m.PlaylistSongsPageModule)
  },
  {
    path: 'songs-user',
    loadChildren: () => import('./songs-user/songs-user.module').then( m => m.SongsUserPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
