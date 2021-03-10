import { TestBed } from '@angular/core/testing';

import { ColorSchemeService } from '../shared/color-scheme.service';

describe('ColorSchemeService', () => {
  let service: ColorSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
