import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.email);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls['code'].addValidators([
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]{1,6}$/, { hasNumber: true }),
      ]);
    }, 0);
  }

  async submit() {
    try {
      await this.client.verifyCode(this.email, this.code);
      console.log('Account registered successfully');
    } catch (err) {
      alert('Invalid code verification');
    } finally {
    }
  }
}
