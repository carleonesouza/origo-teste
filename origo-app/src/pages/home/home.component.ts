import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthGuard } from '../../guards/authGuard';
import { MatMenu } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 

}
