import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanValidationComponent } from './human-validation.component';

describe('HumanValidationComponent', () => {
  let component: HumanValidationComponent;
  let fixture: ComponentFixture<HumanValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
