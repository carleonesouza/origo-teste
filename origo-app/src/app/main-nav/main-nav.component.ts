import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  userAuth = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar,
    private auth: AuthService, private router: Router, private AppServide: AppService) {

  }


  ngOnInit() {
    
    if (this.auth.authenticated) {
      setInterval(() => {
        this.auth.authenticated.subscribe((e) => {
          this.userAuth = e.valueOf();
          console.log(this.userAuth);
        });
      }, 500)
    } 

  }

  signOut(): void {
    if (window && window.localStorage) {
      this.userAuth = false;
      this.router.navigate(['/login']);     
      this.snackBar.open('Successfully Logout!', '', { duration: 4000 });
      localStorage.removeItem('mSesssionId');
      window.localStorage.clear();       
      this.AppServide.logout();
    }

  }


}
