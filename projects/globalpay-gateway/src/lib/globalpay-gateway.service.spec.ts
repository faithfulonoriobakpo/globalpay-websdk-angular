import { TestBed } from '@angular/core/testing';

import { GlobalpayGatewayService } from './globalpay-gateway.service';

describe('GlobalpayGatewayService', () => {
  let service: GlobalpayGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalpayGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
