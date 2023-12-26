import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup = new FormGroup({});

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFromService: Luv2ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);
    this.luv2ShopFromService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log({ 'Retrieved credit card months: ': JSON.stringify(data) });
        this.creditCardMonths = data;
      });

    // populate credit card years
    this.luv2ShopFromService.getCreditCardYears().subscribe((data) => {
      console.log({ 'Retrieved credit card years: ': JSON.stringify(data) });
      this.creditCardYears = data;
    });
  }

  onSubmit() {
    console.log('Handling the submit button:', {
      data: { ...this.checkoutFormGroup.value },
      customer: { ...this.checkoutFormGroup.value.customer },
      shippingAddress: { ...this.checkoutFormGroup.value.shippingAddress },
      billingAddress: { ...this.checkoutFormGroup.value.billingAddress },
      creditCard: { ...this.checkoutFormGroup.value.creditCard },
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    console.log('checked? ', event.target.checked);
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.checkoutFormGroup.controls['billingAddress'].disable();
    } else {
      this.checkoutFormGroup.controls['billingAddress'].enable();
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.luv2ShopFromService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log({ 'Retrieved credit card months: ': JSON.stringify(data) });
        this.creditCardMonths = data;
      });

    creditCardFormGroup?.get('expirationMonth')?.setValue(startMonth);
  }
}
