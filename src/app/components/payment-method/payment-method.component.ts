import { LuhnAlgorithmService } from './../../services/luhn-algorithm.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

// Create local object
export interface CreditCardCompanyModel {
  companyCardName: string;
  imageSrc: string;
  imageAlt: string;
  formName: string;
  placeholderCardNumber: string;
  regexValidatorCardNumber: string;
}

const creditCardCompany: CreditCardCompanyModel[] = [
  {companyCardName: 'Visa', imageSrc: '/assets/cards-logo/visa-logo.png', imageAlt: 'logo-img-card-Visa', formName: 'paymentVisaForm', placeholderCardNumber: '0000 0000 0000 0000', regexValidatorCardNumber: '^4[0-9]{12}(?:[0-9]{3})?$'},
  {companyCardName: 'AmericanExpress', imageSrc: '/assets/cards-logo/american-express-logo.png', imageAlt: 'logo-img-card-American-Express', formName: 'paymentAmExForm', placeholderCardNumber: '0000 000000 00000', regexValidatorCardNumber: '^3[47][0-9]{13}$'},
  {companyCardName: 'MasterCard', imageSrc: '/assets/cards-logo/master-card-logo.png', imageAlt: 'logo-img-card-Master-Card', formName: 'paymentMasterCardForm', placeholderCardNumber: '0000 0000 0000 0000', regexValidatorCardNumber: '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$'},
  {companyCardName: 'Discover', imageSrc: '/assets/cards-logo/Discover-logo.png', imageAlt: 'logo-img-card-Discover', formName: 'paymentDiscoverForm', placeholderCardNumber: '0000 0000 0000 0000', regexValidatorCardNumber: '^6(?:011|5[0-9]{2})[0-9]{12}$'},
  {companyCardName: 'JCB', imageSrc: '/assets/cards-logo/JCB-logo.png', imageAlt: 'logo-img-card-JCB', formName: 'paymentJCBForm', placeholderCardNumber: '0000 0000 0000 0000', regexValidatorCardNumber: '^(?:2131|1800|35\d{3})\d{11}$'}
];


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  public creditCards: CreditCardCompanyModel[] = creditCardCompany
  public currentCardType: CreditCardCompanyModel = this.creditCards[0]
  public cardCompanyActive: string = this.creditCards[0].companyCardName;

  // Send value to Order component 
  @Output() public lastFourNumberCardEvent = new EventEmitter<string>();
  @Output() public validityChange = new EventEmitter<boolean>();
  
  // Form property
  public paymentForm: FormGroup;
  public cardNumber: FormControl;
  public nameOnCard: FormControl;
  public expiryDate: FormControl;
  public securityCode: FormControl;
  
  constructor(private myLuhnAlgorithmService: LuhnAlgorithmService) { }

  ngOnInit() {

    // Initialize form and validator
    this.createPaymentFormController();
    this.createPaymentForm();

  }

  // validation form
  public createPaymentFormController() {
    this.cardNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(this.currentCardType.regexValidatorCardNumber),
      this.myLuhnAlgorithmService.luhnCheck
    ]),
    this.nameOnCard = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/)
    ]),
    this.expiryDate = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/)
    ]),
    this.securityCode = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3}$/)
    ])
  }

  // Create form
  public createPaymentForm() {
    this.paymentForm = new FormGroup({
      cardNumber: this.cardNumber,
      nameOnCard: this.nameOnCard,
      expiryDate: this.expiryDate,
      securityCode: this.securityCode
    })
  }

  // Get card company name
  public getCardCompany(cardCompany: string){

    // Activate link according to user choose 
    this.cardCompanyActive = cardCompany

    // Define currentCardType according to "cardCompany" for validation form
    this.currentCardType = this.creditCards.find( c => c.companyCardName === cardCompany);

    // Reset form and validations errors
    this.paymentForm.reset();

    // Call to form and validators functions to get new validations
    this.createPaymentFormController();
    this.createPaymentForm();
    
  }

  public completePayment(){
    alert(
      "Card Number: " + this.paymentForm.value.cardNumber + "\n" +
      "Name on card: " + this.paymentForm.value.nameOnCard + "\n" +
      "Expiry date: " + this.paymentForm.value.expiryDate + "\n" +
      "Security code: " + this.paymentForm.value.securityCode
      )
  }

  // Reset form and validations errors
  public submitForm(formData: any, formDirective: FormGroupDirective): void {

    formDirective.resetForm();
    this.paymentForm.reset();

  }

}
