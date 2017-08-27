import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductInputComponent } from './new-product-input.component';

describe('NewProductInputComponent', () => {
  let component: NewProductInputComponent;
  let fixture: ComponentFixture<NewProductInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
