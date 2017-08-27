import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserInputComponent } from './new-user-input.component';

describe('NewUserInputComponent', () => {
  let component: NewUserInputComponent;
  let fixture: ComponentFixture<NewUserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
