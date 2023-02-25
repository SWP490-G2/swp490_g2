import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Client } from 'src/app/ngswag/client';
import { CustomValidators } from 'src/app/utils';

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.scss'],
})
export class CodeValidatorComponent implements OnInit, AfterViewInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  client = new Client();
  visible = true;
  @Input() email = 'longlunglay5@gmail.com';
  code = '';

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    console.log(this.email);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls['code'].addValidators([
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]{6}$/, { hasNumber: true }),
      ]);
      this.form.controls['code'].updateValueAndValidity();
    }, 0);
  }

  async submit() {
    this._buttonDisabled = true;
    try {
      await this.client.verifyCode(this.email, this.code);
      this.confirmationService.confirm({
        message: 'Register successfully! Click “YES” to back to login.',
        header: 'Confirmation',
        accept: () => {
          // TODO
          console.log('Navigate to login');
        },
        reject: () => {},
      });
    } catch (err) {
      alert('Invalid code verification');
    } finally {
      this._buttonDisabled = false;
    }
  }

  private _buttonDisabled: boolean = false;
  get buttonDisabled(): boolean {
    return !!this.form?.invalid || this._buttonDisabled;
  }
}
