import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalpayGatewayComponent } from './globalpay-gateway.component';

describe('GlobalpayGatewayComponent', () => {
  let component: GlobalpayGatewayComponent;
  let fixture: ComponentFixture<GlobalpayGatewayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalpayGatewayComponent]
    });
    fixture = TestBed.createComponent(GlobalpayGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
