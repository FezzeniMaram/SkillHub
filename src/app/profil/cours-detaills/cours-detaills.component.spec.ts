import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDetaillsComponent } from './cours-detaills.component';

describe('CoursDetaillsComponent', () => {
  let component: CoursDetaillsComponent;
  let fixture: ComponentFixture<CoursDetaillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursDetaillsComponent]
    });
    fixture = TestBed.createComponent(CoursDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
