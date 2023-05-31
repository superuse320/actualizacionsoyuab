import { TestBed } from '@angular/core/testing';

import { MicolegioService } from './micolegio.service';

describe('MicolegioService', () => {
  let service: MicolegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicolegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
