import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from 'src/model/clientes-model';
import { Plano } from 'src/model/planos-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient,
    private auth: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
    })
  };

  clienteCreate(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${environment.server}/clientes`, cliente,this.httpOptions)
    .pipe();
  }

  listClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.server}/clientes`, this.httpOptions)
    .pipe();
  }
  
  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.server}/clientes/${id}`, this.httpOptions)
      .pipe();
  }

  editCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(environment.server + '/clientes/' + cliente.id , cliente, this.httpOptions)
    .pipe();   
  }

  deletarCliente(cleinte: Cliente): Observable<any> {
    return this.http.delete(environment.server + '/clientes/' + cleinte.id, this.httpOptions )
    .pipe();
  }

  planoCreate(plano:Plano): Observable<Plano>{
    return this.http.post<Plano>(`${environment.server}/planos`, plano,this.httpOptions)
    .pipe();
  }

  getPlanoById(id: string): Observable<Plano> {
    return this.http.get<Plano>(`${environment.server}/planos/${id}`, this.httpOptions)
      .pipe();
  }
  
  listPlanos(): Observable<Plano[]>{
    return this.http.get<Plano[]>(`${environment.server}/planos`, this.httpOptions)
    .pipe();    
  }

  editPlano(plano: Plano): Observable<Plano> {
    return this.http.put<Plano>(environment.server + '/planos/' + plano.id , plano, this.httpOptions)
    .pipe();   
  }

  deletarPlano(plano: Plano): void {
    this.http.delete(environment.server + '/planos/' + plano.id, this.httpOptions )
    .pipe();
  }

}
