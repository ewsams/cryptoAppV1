import { TestBed } from '@angular/core/testing';

import { LogginService } from './loggin.service';

describe('LogginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogginService = TestBed.get(LogginService);
    expect(service).toBeTruthy();
  });
});
