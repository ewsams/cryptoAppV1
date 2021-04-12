import { TestBed } from '@angular/core/testing';

import { UserPricingService } from './user-pricing.service';

describe('UserPricingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPricingService = TestBed.get(UserPricingService);
    expect(service).toBeTruthy();
  });
});
