import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratePaymentLinkPayload, GeneratePaymentLinkResponse } from './globalpay-gateway.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalpayGatewayService {

  constructor(
    private http: HttpClient
  ) { }

  generatePaymentLink(payload: GeneratePaymentLinkPayload, apiKey: string): Observable<GeneratePaymentLinkResponse>{
    return this.http.post<GeneratePaymentLinkResponse>(
      'https://paygw.globalpay.com.ng/globalpay-paymentgateway/api/paymentgateway/generate-payment-link',
      payload,
      {headers: new HttpHeaders({
        'Language': 'en',
        'apikey': apiKey
      })}
    );
  }
}
