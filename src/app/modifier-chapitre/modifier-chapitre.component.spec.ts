import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChapitreComponent } from './modifier-chapitre.component';

describe('ModifierChapitreComponent', () => {
  let component: ModifierChapitreComponent;
  let fixture: ComponentFixture<ModifierChapitreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierChapitreComponent]
    });
    fixture = TestBed.createComponent(ModifierChapitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
