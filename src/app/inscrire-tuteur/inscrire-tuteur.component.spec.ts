import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrireTuteurComponent } from './inscrire-tuteur.component';

describe('InscrireTuteurComponent', () => {
  let component: InscrireTuteurComponent;
  let fixture: ComponentFixture<InscrireTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscrireTuteurComponent]
    });
    fixture = TestBed.createComponent(InscrireTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
