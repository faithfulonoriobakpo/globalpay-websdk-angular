import { Component, EventEmitter, Input, Output } from '@angular/core';
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

export interface GeneratePaymentLinkError {
  message: string,
  details: any
}

@Component({
  selector: 'globalpay',
  template: `
    <button 
      (click)="generatePaymentLink()"
      [class.fade]="generatingLink"
      [ngStyle]="buttonStyle"
      [disabled]="buttonDisabled"
    >
      {{buttonText}} &nbsp;
      <span *ngIf="generatingLink" class="loading-animation"></span>
    </button>
  `,
  styles: [
    `
    button {
      background-color: #007bff;
      display: flex;
      align-items: center;
      color: #fff;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
      font-weight: bold;
    }

    button.fade, button:disabled {
      opacity: 0.5;
    }

    .loading-animation {
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-left-color: #fff;
      border-radius: 50%;
      width: 12px;
      height: 12px;
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
  @Input() isLive: boolean = true;
  @Input() buttonText: string = "Pay";
  @Input() apiKey!: string;
  @Input() payload!: GeneratePaymentLinkPayload;
  @Input() buttonDisabled: boolean = false;
  @Input() buttonStyle: {
                          [klass: string]: any;
                        } | null | undefined;
  generatingLink: boolean = false;
  @Output() onError: EventEmitter<GeneratePaymentLinkError> = new EventEmitter<GeneratePaymentLinkError>();

  constructor(
    private globapayService: GlobalpayGatewayService
  ){}

  generatePaymentLink(){

    const emptyKeys = this.findEmptyKeys(this.payload);

    if(!this.apiKey){
      return this.onError.emit({message: 'API Key is required', details:null});
    }else if(!this.payload){
      return this.onError.emit({message: 'Payload is required', details:null});
    }else if(emptyKeys.length > 0){
      const requiredFields = emptyKeys.join(', ').replace(/, (?!.*, )/, ' and ')
      return this.onError.emit({message: `Payload is invalid. ${requiredFields} required`, details: null});
    }

    this.generatingLink = true;

    this.globapayService.generatePaymentLink(this.payload, this.apiKey, this.isLive)
    .pipe(
      finalize(() => this.generatingLink = false)
    )
    .subscribe({
      next: (res: GeneratePaymentLinkResponse) => {
        window.location.href = res?.data?.checkoutUrl;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.onError.emit(
          {
            message: 'error occurred generating paymentlink',
            details: error
          }
          );
      }
    });
  }

  findEmptyKeys(payload: any): string[] {
    const emptyKeys: string[] = [];
    
    for (const key in payload) {

      if(key == 'address') continue;

      if (payload.hasOwnProperty(key)) {
        if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
          emptyKeys.push(key);
        } else if (typeof payload[key] === 'object') {
          const subEmptyKeys = this.findEmptyKeys(payload[key]);
          emptyKeys.push(...subEmptyKeys);
        }
      }
    }
    return emptyKeys;
  }
}
