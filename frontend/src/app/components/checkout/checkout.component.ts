import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { count } from 'rxjs';

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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

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

    // populate countries
    this.luv2ShopFromService.getCountries().subscribe((data) => {
      console.log({ 'Retrieved countries: ': { ...data } });
      this.countries = data;
    });
  }

  onSubmit() {
    console.clear();
    console.log('Handling the submit button:', {
      data: { ...this.checkoutFormGroup.value },
      customer: { ...this.checkoutFormGroup.value.customer },
      shippingAddress: { ...this.checkoutFormGroup.value.shippingAddress },
      billingAddress: { ...this.checkoutFormGroup.value.billingAddress },
      creditCard: { ...this.checkoutFormGroup.value.creditCard },
      shippingAddressCountry:
        this.checkoutFormGroup.value.shippingAddress.country.name,
      shippingAddressState:
        this.checkoutFormGroup.value.shippingAddress.state.name,
      billingAddressCountry:
        this.checkoutFormGroup.value.billingAddress.country.name,
      billingAddressState:
        this.checkoutFormGroup.value.billingAddress.state.name,
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    console.log('checked? ', event.target.checked);
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
      this.checkoutFormGroup.controls['billingAddress'].disable();
    } else {
      this.checkoutFormGroup.controls['billingAddress'].enable();
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

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log({ formGroupName, countryCode, countryName });

    this.luv2ShopFromService.getStates(countryCode).subscribe((data) => {
      console.log({ 'Retrieved states: ': { ...data } });
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
