import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { AppComponent } from '../../app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-conta',
  templateUrl: './add-conta.component.html',
  styleUrls: ['./add-conta.component.scss']
})
export class AddContaComponent implements OnInit {
  @Input() registerForm!: FormGroup;
  hide = true;
  error = undefined;

  constructor(private AppService: AppService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private router: Router, private auth: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get("email"); }
  get password() { return this.registerForm.get("password"); }

  onNoClick() {
    this.registerForm.reset();
    if (this.auth.authenticated) {
      this.router.navigate(['/conta']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.registerForm.valid.valueOf()) {
      this.AppService.register(this.registerForm.getRawValue())
        .subscribe(r => {
          localStorage.setItem('mSessionId', r.access_token);
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Successfully Registred!', '', { duration: 4000 });
        }, e => {
          this.snackBar.open('Error occurred this process '+e.message + ' '+e.status, '', { duration: 4000 });
        });

    } else {
      this.snackBar.open('Error occurred this process', '', { duration: 4000 });
    }
  }

  gotToApp() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
