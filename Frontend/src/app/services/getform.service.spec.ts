import { TestBed } from '@angular/core/testing';

import { GetformService } from './getform.service';

describe('GetformService', () => {
  let service: GetformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
