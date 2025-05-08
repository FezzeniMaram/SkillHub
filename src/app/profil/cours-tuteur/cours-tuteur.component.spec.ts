import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursTuteurComponent } from './cours-tuteur.component';

describe('CoursTuteurComponent', () => {
  let component: CoursTuteurComponent;
  let fixture: ComponentFixture<CoursTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursTuteurComponent]
    });
    fixture = TestBed.createComponent(CoursTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
