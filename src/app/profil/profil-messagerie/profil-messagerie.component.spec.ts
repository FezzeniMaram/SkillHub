import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMessagerieComponent } from './profil-messagerie.component';

describe('ProfilMessagerieComponent', () => {
  let component: ProfilMessagerieComponent;
  let fixture: ComponentFixture<ProfilMessagerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilMessagerieComponent]
    });
    fixture = TestBed.createComponent(ProfilMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
