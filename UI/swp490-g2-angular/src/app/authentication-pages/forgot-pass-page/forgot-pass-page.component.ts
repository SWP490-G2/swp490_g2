import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Client, User } from 'src/app/ngswag/client';

@Component({
  selector: 'app-forgot-pass-page',
  templateUrl: './forgot-pass-page.component.html',
  styleUrls: ['./forgot-pass-page.component.scss']
})
export class ForgotPassPageComponent {
  @ViewChild('form', { static: false }) form!: NgForm;
  client = new Client();
  codeValidatorDialogVisible = true;
  user?: User;
  $router: any;
  $route: any;

  // To change title, we need to import title service
  constructor(
    $title: Title  ) {
    $title.setTitle('Forgot Password');
  }

  async forgotPassword(): Promise<void> {

  }

  private _fgtPassButtonDisabled: boolean = false;
  get fgtPassButtonDisabled(): boolean {
    // Force type <boolean | null> to <boolean>, add double exclaimation mark !!
    // a = 1
    // !a = false
    // !!a = true

    return !!this.form?.invalid || this._fgtPassButtonDisabled;
  }

  set registerButtonDisabled(value: boolean) {
    this._fgtPassButtonDisabled = value;
  }

  navToLogin() {
    this.$router.navigate(['auth', 'login'], {relativeTo: this.$route});
  }

  navToRegister() {
    this.$router.navigate(['auth', 'register'], {relativeTo: this.$route});
  }
}
