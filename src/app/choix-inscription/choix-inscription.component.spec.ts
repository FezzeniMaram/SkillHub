import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixInscriptionComponent } from './choix-inscription.component';

describe('ChoixInscriptionComponent', () => {
  let component: ChoixInscriptionComponent;
  let fixture: ComponentFixture<ChoixInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixInscriptionComponent]
    });
    fixture = TestBed.createComponent(ChoixInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
