import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLayoutComponent } from './profil-layout.component';

describe('ProfilLayoutComponent', () => {
  let component: ProfilLayoutComponent;
  let fixture: ComponentFixture<ProfilLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilLayoutComponent]
    });
    fixture = TestBed.createComponent(ProfilLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
