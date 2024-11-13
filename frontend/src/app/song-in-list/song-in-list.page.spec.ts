import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongInListPage } from './song-in-list.page';

describe('SongInListPage', () => {
  let component: SongInListPage;
  let fixture: ComponentFixture<SongInListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongInListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
