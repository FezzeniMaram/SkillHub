import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSupportComponent } from './profil-support.component';

describe('ProfilSupportComponent', () => {
  let component: ProfilSupportComponent;
  let fixture: ComponentFixture<ProfilSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilSupportComponent]
    });
    fixture = TestBed.createComponent(ProfilSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
