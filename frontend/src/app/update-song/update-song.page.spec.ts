import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateSongPage } from './update-song.page';

describe('UpdateSongPage', () => {
  let component: UpdateSongPage;
  let fixture: ComponentFixture<UpdateSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
