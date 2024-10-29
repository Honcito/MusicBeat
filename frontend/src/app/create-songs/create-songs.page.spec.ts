import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSongsPage } from './create-songs.page';

describe('CreateSongsPage', () => {
  let component: CreateSongsPage;
  let fixture: ComponentFixture<CreateSongsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
