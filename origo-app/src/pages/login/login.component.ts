import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Usuario } from '../../model/user-conta-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AppComponent } from '../../app/app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  conta!: Usuario;
  loggingIn = false;
  error = undefined;
  @Input()
  loginForm!: FormGroup;


  constructor(public AppService: AppService, private formBuilder: FormBuilder,
     private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
     private viewContainerRef: ViewContainerRef, private snackBar: MatSnackBar,
     private auth: AuthService) {  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get email() {return this.loginForm.get("email"); }
  get password() {return this.loginForm.get("password"); }

  onNoClick() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid.valueOf()) {
      this.AppService.login(this.loginForm.getRawValue())
      .subscribe(r => {
        localStorage.setItem('mSessionId', r.access_token);
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Successfully Logged!', '', { duration: 4000 });
    }, e => {
      this.snackBar.open('Error occurred this process '+e.message + ' '+e.status, '', { duration: 4000 });
    });
      
    }else{
      this.snackBar.open('Error occurred this process', '', { duration: 4000 });
    }
  }

  gotToApp() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
