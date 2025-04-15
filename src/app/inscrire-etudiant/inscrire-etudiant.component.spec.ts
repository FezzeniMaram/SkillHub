import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrireEtudiantComponent } from './inscrire-etudiant.component';

describe('InscrireEtudiantComponent', () => {
  let component: InscrireEtudiantComponent;
  let fixture: ComponentFixture<InscrireEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscrireEtudiantComponent]
    });
    fixture = TestBed.createComponent(InscrireEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
