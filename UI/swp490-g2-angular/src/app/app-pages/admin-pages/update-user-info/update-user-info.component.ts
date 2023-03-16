import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { AuthenticationResponse } from "src/app/ngswag/client";

@Component({
  selector: "app-update-user-info",
  templateUrl: "./update-user-info.component.html",
})
export class UpdateUserInfoComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { static: false }) form!: NgForm;
  selectedGender: any = null;
  dob: Date;
  genders: any[] = [
    { name: "Male", key: "M" },
    { name: "Female", key: "F" },
  ];

  uploadedFiles: any[] = [];
  $client: any;
  private _registerButtonDisabled: boolean;
  codeValidatorDialogVisible: boolean;

  constructor(private messageService: MessageService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["email"].addValidators([
        Validators.required,
        Validators.email,
      ]);
      this.form.controls["email"].updateValueAndValidity(); // !Important: this line must be added after validators created

      this.form.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
      ]);
      this.form.controls["phoneNumber"].updateValueAndValidity();
    }, 0);
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }

  register(): void {
    this.$client
      .register(this.form.value)
      .pipe(
        finalize(() => {
          this._registerButtonDisabled = false;
        })
      )
      .subscribe({
        next: (authenticationResponse: AuthenticationResponse) => {
          if (authenticationResponse.errorMessage) {
            throw new Error(authenticationResponse.errorMessage);
          }
          this.codeValidatorDialogVisible = true;
        },
      });
  }

  ngOnInit() {
    this.selectedGender = this.genders[1];
  }
}
