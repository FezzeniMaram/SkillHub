import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilInfosComponent } from './profil-infos.component';

describe('ProfilInfosComponent', () => {
  let component: ProfilInfosComponent;
  let fixture: ComponentFixture<ProfilInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilInfosComponent]
    });
    fixture = TestBed.createComponent(ProfilInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
