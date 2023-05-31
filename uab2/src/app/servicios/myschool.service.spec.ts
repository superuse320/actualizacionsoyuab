import { TestBed } from '@angular/core/testing';

import { MyschoolService } from './myschool.service';

describe('MyschoolService', () => {
  let service: MyschoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyschoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
