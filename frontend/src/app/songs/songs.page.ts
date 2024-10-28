import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {
  songs: any[] = [];
  constructor(private songService: SongService) { }

  ngOnInit() {
    this.loadSongs();
  }

  onViewWillEnter(){
    this.loadSongs();
   }
 
   loadSongs() {
     this.songService.getAllSongs().subscribe((data: any[]) => {
         this.songs = data;
       });
       
   }
 
   deleteSong(id: number) {
     this.songService.deleteSong(id).subscribe(() => {
       this.loadSongs();  // Reload the list after deletion
     });
   }

}
