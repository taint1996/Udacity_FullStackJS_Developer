import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  createCheckoutForm!: FormGroup;
  submitted = false;
  @Output() userInfo = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCheckoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      creditCard: ['', [Validators.required]],
    });
  }
  onSubmitCheckout() {
    this.userInfo.emit(this.createCheckoutForm.value);
  }

  get fullName() {
    return this.createCheckoutForm.get('fullName');
  }
  get address() {
    return this.createCheckoutForm.get('address');
  }
  get creditCard() {
    return this.createCheckoutForm.get('creditCard');
  }
}
