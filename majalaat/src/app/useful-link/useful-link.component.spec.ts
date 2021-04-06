import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinkComponent } from './useful-link.component';

describe('UsefulLinkComponent', () => {
  let component: UsefulLinkComponent;
  let fixture: ComponentFixture<UsefulLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsefulLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
