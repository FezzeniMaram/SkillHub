import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCoursComponent } from './modifier-cours.component';

describe('ModifierCoursComponent', () => {
  let component: ModifierCoursComponent;
  let fixture: ComponentFixture<ModifierCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCoursComponent]
    });
    fixture = TestBed.createComponent(ModifierCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
