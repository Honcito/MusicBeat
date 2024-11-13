import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistSongsPage } from './playlist-songs.page';

describe('PlaylistSongsPage', () => {
  let component: PlaylistSongsPage;
  let fixture: ComponentFixture<PlaylistSongsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
