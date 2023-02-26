import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Client, User } from 'src/app/ngswag/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  client = new Client();
  codeValidatorDialogVisible = true;
  user?: User;

  // To change title, we need to import title service
  constructor(
    $title: Title  ) {
    $title.setTitle('Register');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async login(): Promise<void> {

  }

  private _loginButtonDisabled: boolean = false;
  get loginButtonDisabled(): boolean {
    // Force type <boolean | null> to <boolean>, add double exclaimation mark !!
    // a = 1
    // !a = false
    // !!a = true

    return !!this.form?.invalid || this._loginButtonDisabled;
  }

  set registerButtonDisabled(value: boolean) {
    this._loginButtonDisabled = value;
  }
}
