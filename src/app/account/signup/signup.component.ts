import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  message!: string;

  constructor(
    private fb: FormBuilder,
    private dataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      org: [''],
      euResident: ['', Validators.required],
      advances: [false],
      alerts: [false, Validators.requiredTrue],
      other: [false],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  reset() {
    this.submitted = false;
    this.signupForm.reset({
      euResident: ''
    });
  }

  onSignup() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.dataService
      .signup(this.signupForm.value)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.submitted = false;
          this.signupForm.reset();
          console.log('Successful response', response);
          this.message = response.message;
        },
        (error) => {
          console.log('Error While submitting the form', error);
          this.message = error.message;
        }
      );
  }
}
