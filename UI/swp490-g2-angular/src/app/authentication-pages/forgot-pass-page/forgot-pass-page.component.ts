import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { User, UserClient } from "src/app/ngswag/client";
import { CustomValidators } from "src/app/utils";

@Component({
  selector: "app-forgot-pass-page",
  templateUrl: "./forgot-pass-page.component.html",
  styleUrls: ["./forgot-pass-page.component.scss"],
})
export class ForgotPassPageComponent implements AfterViewInit{
  @ViewChild("form", { static: false }) form!: NgForm;
  codeValidatorDialogVisible = true;
  user?: User;
  verificationCodeShown = false;

  // To change title, we need to import title service
  constructor(
    $title: Title,
    private $router: Router,
    private $route: ActivatedRoute,
    private $userClient: UserClient
  ) {
    $title.setTitle("Forgot Password");
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["email"].addValidators([
        Validators.required,
        Validators.email,
      ]);
      this.form.controls["email"].updateValueAndValidity();

      this.form.controls["verificationCode"].addValidators([
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]{6}$/, { hasNumber: true }),
      ]);
      this.form.controls["verificationCode"].updateValueAndValidity();
    }, 0);
  }

  async forgotPassword(): Promise<void> {}

  private _fgtPassButtonDisabled = false;
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
    this.$router.navigate(["..", "login"], { relativeTo: this.$route });
  }

  navToRegister() {
    this.$router.navigate(["..", "register"], { relativeTo: this.$route });
  }

  onVerificationCodeClicked() {
    if(!this.verificationCodeShown)
    {
      this.verificationCodeShown = true;
    } else {
      this.$userClient.verifyCode(this.form.value.email, true, this.form.value.verificationCode)
        .subscribe(() => {
          console.log("ok");
        });
    }
  }
}
