import { Component, Input } from '@angular/core';
import { GlobalpayGatewayService } from './globalpay-gateway.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

export interface GeneratePaymentLinkPayload {
  amount: number,
  secretKey: string,
  merchantTransactionReference: string,
  redirectUrl: string,
  customer: {
    lastName: string,
    firstName: string,
    currency: string,
    phoneNumber: string,
    address: string,
    emailAddress: string
  }
}

export interface GeneratePaymentLinkResponse {
  data: {
    checkoutUrl: string,
    accessCode: string,
    redirectURL: string,
    transactionReference: string,
    merchantMode: string,
    merchantCurrencies: string[]
  },
  successMessage: string,
  responseCode: string,
  isSuccessful: boolean,
  error: any
}

@Component({
  selector: 'globalpay',
  template: `
    <button (click)="generatePaymentLink()" [class.fade]="generatingLink" [style]="buttonStyle">
      {{buttonText}} &nbsp;
      <span *ngIf="generatingLink" class="loading-animation"></span>
    </button>
  `,
  styles: [
    `
    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 8px;
    }
    button.fade {
      opacity: 0.5;
    }
    .loading-animation {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #007bff;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
      display: inline-block;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    `
  ]
})
export class GlobalpayGatewayComponent {
  @Input() buttonText: string = "Pay";
  @Input() apiKey!: string;
  @Input() payload!: GeneratePaymentLinkPayload;
  @Input() buttonStyle: string = "";
  generatingLink: boolean = false;

  constructor(
    private globapayService: GlobalpayGatewayService
  ){}

  generatePaymentLink(){
    this.generatingLink = true;

    this.globapayService.generatePaymentLink(this.payload, this.apiKey)
    .pipe(
      finalize(() => this.generatingLink = false)
    )
    .subscribe({
      next: (res: GeneratePaymentLinkResponse) => {
        window.location.href = res?.data?.checkoutUrl;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
