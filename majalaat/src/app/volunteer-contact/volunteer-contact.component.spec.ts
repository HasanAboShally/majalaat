import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerContactComponent } from './volunteer-contact.component';

describe('VolunteerContactComponent', () => {
  let component: VolunteerContactComponent;
  let fixture: ComponentFixture<VolunteerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
