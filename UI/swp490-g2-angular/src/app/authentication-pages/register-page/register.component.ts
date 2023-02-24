import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Message, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ApiException, Client } from 'src/app/ngswag/client';
import { CustomValidators } from 'src/app/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  client = new Client();

  // To change title, we need to import title service
  constructor(
    private $title: Title,
    private $fb: FormBuilder,
    private $message: MessageService
  ) {
    $title.setTitle('Register');
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
        const password = this.form.controls['password'].value;
        if (password !== control.value) {
          return {
            message:
              'Confirm password must be the same as the entered password',
          };
        }

        return null;
      };
    };

    this.form.controls['confirmPassword'].addValidators([
      Validators.required,
      validator(),
    ]);
    this.form.controls['confirmPassword'].updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls['email'].addValidators([
        Validators.required,
        Validators.email,
      ]);
      this.form.controls['email'].updateValueAndValidity(); // !Important: this line must be added after validators created

      this.form.controls['password'].addValidators([
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]/,
          { hasSpecialCharacters: true }
        ),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8),
        // 7. Has a maximum length of 25 characters
        Validators.maxLength(25),
      ]);
      this.form.controls['password'].updateValueAndValidity();

      this.form.controls['phoneNumber'].addValidators([
        Validators.required,
        Validators.pattern('^(0[3|5|7|8|9])+([0-9]{8})$'),
      ]);
      this.form.controls['phoneNumber'].updateValueAndValidity();

      this.initConfirmPasswordValidator();
    }, 0);
  }

  ngOnInit(): void {}

  async register(): Promise<void> {
    this._registerButtonDisabled = true;

    try {
      const user = await this.client.addNewUser(this.form.value);
      console.log(user);
    }
    catch (err){
      console.log(err);
      this.$message.add({
        severity: "error",
        summary: "Error",
        detail: (err as ApiException).message
      });
    }
    finally {
      this._registerButtonDisabled = false;
    }

    // Open popup here
  }

  validatePasswordStyle(field: string): boolean {
    if (!this.form || !this.form.controls['password']) return true;

    return (
      this.form.controls['password'].errors &&
      (this.form.controls['password'].errors['required'] ||
        this.form.controls['password'].errors[field])
    );
  }

  private _registerButtonDisabled: boolean = false;
  get registerButtonDisabled(): boolean {
    // Force type <boolean | null> to <boolean>, add double exclaimation mark !!
    // a = 1
    // !a = false
    // !!a = true

    return !!this.form?.invalid || this._registerButtonDisabled;
  }

  set registerButtonDisabled(value: boolean) {
    this._registerButtonDisabled = value;
  }
}
