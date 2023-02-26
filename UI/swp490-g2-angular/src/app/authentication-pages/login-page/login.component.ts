import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Client, User } from 'src/app/ngswag/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  client = new Client();
  codeValidatorDialogVisible = true;
  user?: User;

  // To change title, we need to import title service
  constructor(
    $title: Title,
    private $router: Router,
    private $route: ActivatedRoute
  ) {
    $title.setTitle('Login');
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls['email'].addValidators([
        Validators.required,
        Validators.email,
      ]);
      this.form.controls['email'].updateValueAndValidity(); // !Important: this line must be added after validators created

      this.form.controls['password'].addValidators([Validators.required]);
      this.form.controls['password'].updateValueAndValidity();
    }, 0);
  }
  ngOnInit(): void {}

  async login(): Promise<void> {
    // TODO
  }

  private _loginButtonDisabled: boolean = false;
  get loginButtonDisabled(): boolean {
    return !!this.form?.invalid || this._loginButtonDisabled;
  }

  set registerButtonDisabled(value: boolean) {
    this._loginButtonDisabled = value;
  }

  navToRegister() {
    this.$router.navigate(['..', 'register'], { relativeTo: this.$route });
    /**
     * /auth/login
     * /auth
     * /auth/register
     */
  }
}
