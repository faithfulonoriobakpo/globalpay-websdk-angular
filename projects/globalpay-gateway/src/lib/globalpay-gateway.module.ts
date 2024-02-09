import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalpayGatewayComponent } from './globalpay-gateway.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GlobalpayGatewayComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    GlobalpayGatewayComponent
  ],
})
export class GlobalpayGatewayModule { }
