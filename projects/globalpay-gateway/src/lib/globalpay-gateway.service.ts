import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratePaymentLinkPayload, GeneratePaymentLinkResponse } from './globalpay-gateway.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalpayGatewayService {
  liveUrl: string = 'https://paygw.globalpay.com.ng/globalpay-paymentgateway/api/paymentgateway/generate-payment-link';
  testUrl: string = 'https://newwebservicetest.zenithbank.com:8443/new-globalpay-paymentgateway-external/api/paymentgateway/generate-payment-link';

  constructor(
    private http: HttpClient
  ) { }

  generatePaymentLink(payload: GeneratePaymentLinkPayload, apiKey: string, isLive: boolean): Observable<GeneratePaymentLinkResponse>{
    return this.http.post<GeneratePaymentLinkResponse>(
      isLive? this.liveUrl: this.testUrl,
      payload,
      {headers: new HttpHeaders({
        'Language': 'en',
        'apikey': apiKey
      })}
    );
  }
}
