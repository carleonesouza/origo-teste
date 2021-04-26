import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/model/clientes-model';
import { Plano } from 'src/model/planos-model';
import { ApiService } from 'src/service/api.service';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import * as moment from 'moment';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ]
})
export class CadastrarClienteComponent implements OnInit {
  @Input() clienteForm!: FormGroup;
  planos!: Plano[];
  process=false;
  delete=false;

  constructor(private formBuilder: FormBuilder, private ApiService: ApiService,  private snackBar: MatSnackBar) { 
    this.planos = [];
  }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(3)]],
      cidade: ['', [Validators.required, Validators.minLength(3)]],
      nascimento: ['', [Validators.required]],
    });

    this.ApiService.listPlanos()
    .subscribe((planos) =>{
      this.planos= planos;
    });
  }

  get nome() { return this.clienteForm.get('nome'); }
  get email() { return this.clienteForm.get("email"); }
  get telefone() { return this.clienteForm.get("telefone"); }
  get estado() { return this.clienteForm.get("estado"); }
  get cidade() { return this.clienteForm.get("cidade"); }
  get nascimento() { return this.clienteForm.get("nascimento"); }
  
  onCancel(){
    this.clienteForm.reset();
  }
  
  onSubmit() {
    if (this.clienteForm.valid.valueOf()) { 
      
      var cliente = new Cliente(this.clienteForm.getRawValue());
      var date = moment(this.clienteForm.get('nascimento')?.value).format('L')
      cliente.nascimento = date;
      this.ApiService.clienteCreate(cliente)
      .subscribe(r => {  
        if(r){
          this.process = false;
          this.snackBar.open('Cliente Successfully Registred!', '', { duration: 4000 });
        }else{
          this.process = true;  
        }
       
      }, e => {
        this.snackBar.open('Error occurred this process '+e.message + ' '+e.status, '', { duration: 4000 });
      });

  } else {
    this.snackBar.open('Error occurred this process', '', { duration: 4000 });
  }
  }
}
