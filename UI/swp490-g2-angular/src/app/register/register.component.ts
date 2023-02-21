import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Client } from "../ngswag/client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('form', { static: false }) form!: NgForm;

  // To change title, we need to import title service
  constructor(
    private $title: Title,
    private $fb: FormBuilder,
    private $client: Client
  ) {
    $title.setTitle("Register");
  }

  private initConfirmPasswordValidator(): void {
    /**
    Template for validator
      const validator = (): ValidatorFn => {
      return (control: AbstractControl<any, any>): ValidationErrors | null => {

        }
      }

     */


    const validator = (): ValidatorFn => {
      return (control: AbstractControl<any, any>): ValidationErrors | null => {
        const password = this.form.controls["password"].value;
        if (password !== control.value) {
          return {
            message: "Confirm password must be the same as the entered password"
          };
        }

        return null;
      };
    };

    this.form.controls["confirmPassword"].addValidators([Validators.required, validator()]);
    this.form.controls['confirmPassword'].updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["email"].addValidators([Validators.required, Validators.email]);
      this.form.controls['email'].updateValueAndValidity(); // !Important: this line must be added after validators created

      this.form.controls["password"].addValidators([Validators.required, Validators.minLength(8)]);
      this.form.controls['password'].updateValueAndValidity();

      this.initConfirmPasswordValidator();
    }, 0);
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.invalid) {
      if (this.form.controls["email"].errors) {
        alert("Email is not valid");
        return;
      }

      // This is how to get message from the form field's error
      if (this.form.controls["confirmPassword"].errors) {
        alert(this.form.controls["confirmPassword"].errors['message']);
        return;
      }

      alert("Form is not valid");
      return;
    }

    this.$client.addNewUser(this.form.value)
      .subscribe(user => {
        console.log(user);
      });
  }
}
