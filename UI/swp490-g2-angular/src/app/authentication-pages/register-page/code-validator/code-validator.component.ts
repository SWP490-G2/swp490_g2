import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { finalize } from "rxjs";
import { Client } from "src/app/ngswag/client";
import { CustomValidators } from "src/app/utils";

@Component({
  selector: "app-code-validator",
  templateUrl: "./code-validator.component.html",
  styleUrls: ["./code-validator.component.scss"],
})
export class CodeValidatorComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { static: false }) form!: NgForm;
  visible = true;
  @Input() email = "longlunglay5@gmail.com";

  constructor(private confirmationService: ConfirmationService,
    private $client: Client,
    private $router: Router,
    private $route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    // console.log(this.email);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["code"].addValidators([
        Validators.required,
        CustomValidators.patternValidator(/^[0-9]{6}$/, { hasNumber: true }),
      ]);
      this.form.controls["code"].updateValueAndValidity();
    }, 0);
  }

  async submit() {
    this._buttonDisabled = true;
    this.$client.verifyCode(this.email, this.form.controls["code"].value)
      .pipe(finalize(() => {
        this._buttonDisabled = false;
      }))
      .subscribe({
        next: (errorMessage) => {
          if (!errorMessage) {
            return this.confirmationService.confirm({
              message: "Register successfully! Click “YES” to back to login.",
              header: "Confirmation",
              accept: () => {
                this.$router.navigate(["..", "login"], { relativeTo: this.$route });
              },
              reject: () => { },
            });
          }

          throw new Error(errorMessage);
        }
      });
  }

  private _buttonDisabled = false;
  get buttonDisabled(): boolean {
    return !!this.form?.invalid || this._buttonDisabled;
  }
}
