import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterChapitreComponent } from './ajouter-chapitre.component';

describe('AjouterChapitreComponent', () => {
  let component: AjouterChapitreComponent;
  let fixture: ComponentFixture<AjouterChapitreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterChapitreComponent]
    });
    fixture = TestBed.createComponent(AjouterChapitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
