import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  { Usuario } from '../model/user-conta-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { Cliente } from 'src/model/clientes-model';


@Injectable()
export class AppService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };



  login(usuario :Usuario) : Observable<any>{
    return this.httpClient.post(`${environment.server}/login`, usuario,this.httpOptions)
    .pipe();
  }

  register(usuario :Usuario): Observable<any>{
    return this.httpClient.post(`${environment.server}/register`, usuario,this.httpOptions)
    .pipe();
  }

  logout():void{
    this.httpClient.post(`${environment.server}/logout`, this.httpOptions)
    .pipe();    
  }

  
 }
