import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBlocageComponent } from './liste-blocage.component';

describe('ListeBlocageComponent', () => {
  let component: ListeBlocageComponent;
  let fixture: ComponentFixture<ListeBlocageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeBlocageComponent]
    });
    fixture = TestBed.createComponent(ListeBlocageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
