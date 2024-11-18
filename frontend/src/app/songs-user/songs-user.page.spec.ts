
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsUserPage } from './songs-user.page';

describe('SongsUserPage', () => {
  let component: SongsUserPage;
  let fixture: ComponentFixture<SongsUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
