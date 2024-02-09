# GlobalPay Web SDK for Angular

This is an Angular library for integrating GlobalPay Payment Gateway into Angular applications.

## Installation

You can install this library via npm:

```bash
npm install globalpay-websdk-angular

```

## Usage
### Module (<= angular 16) - Import the module

Import GlobalPayModule into your Angular application's module where Globalpay is used:

```ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalPayModule } from 'globalpay-websdk-angular';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    BrowserModule,
    GlobalPayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Standalone (>= angular 17) - Add to imports

```ts

import { Component } from '@angular/core';
import { GeneratePaymentLinkPayload } from 'globalpaygateway-sdk-angular';

@Component({
  selector: 'your-component',
  standalone: true,
  imports: [GlobalPayModule],
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.scss']
})
export class YourComponent {
}
```


### Use the component
Use the globalpay component in your template:


```html
<globalpay
    [apiKey]="apiKey"
    [payload]="payload"
    [buttonStyle]="buttonStyle"
    [buttonText]="buttonText"
>
</globalpay>
```

```ts

import { GeneratePaymentLinkPayload } from 'globalpaygateway-sdk-angular';
import { Component } from '@angular/core';
import { GeneratePaymentLinkPayload } from 'globalpaygateway-sdk-angular';

@Component({
  selector: 'your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.scss']
})
export class YourComponent {
   payload: GeneratePaymentLinkPayload = {
    amount: 1500,
    secretKey: "Your secret key",
    merchantTransactionReference: "your transaction reference",
    redirectUrl: "your redirect url",
    customer: {
      lastName: "Doe",
      firstName: "John",
      currency: "NGN",
      phoneNumber: "customer phone number",
      address: "string",
      emailAddress: "customer email"
    }
  };

  apiKey = 'your api key';
  buttonStyle = {
    'background': 'red',
    'font-size': '16px'
    // other styles
  };
  buttonText = "Proceed to Pay";
}

```

> buttonText and buttonStyle inputs are optional. buttonText is defaulted to Pay unless specified from input and buttonStyle is defaulted to a blue background with white text.
