import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthService {
    @Output() open: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) { }

    get authenticated(): Observable<boolean> {
        if (localStorage.getItem('mSessionId') !== null) {
            this.open.emit(true);
            return of(true);
            
        } else {
            this.open.emit(false);
            this.router.navigate(['/login']);
            return of(false);
        }
    }

}
