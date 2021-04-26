import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Cliente } from 'src/model/clientes-model';
import { Plano } from 'src/model/planos-model';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: '../cadastrar-cliente/cadastrar-cliente.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

 
  process=false;
  planos!: Plano[];
  title!: string;
  delete= true;
  group = {};
  fields: string[] = [];
  clientes!: Cliente[];
  @Input() clienteForm!: FormGroup;
  @Input('choose') choose!: string;


  constructor(public dialogRef: MatDialogRef<DeleteComponent>,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any, private ApiService: ApiService,
    public snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) {
   
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
    this.ApiService.listClientes().subscribe((clientes) =>{
      this.clientes = clientes;
    });

    this.ApiService.listPlanos()
    .subscribe((planos) =>{
      this.planos= planos;
    });

    this.refresh();
  }
  ngAfterContentInit() {
    if (new Cliente(this.data)) {
      this.onLoadCliente();
    } 

  };

  get nome() { return this.clienteForm.get('nome'); }
  get email() { return this.clienteForm.get("email"); }
  get telefone() { return this.clienteForm.get("telefone"); }
  get estado() { return this.clienteForm.get("estado"); }
  get cidade() { return this.clienteForm.get("cidade"); }
  get nascimento() { return this.clienteForm.get("nascimento"); }



  onLoadCliente() {
    this.title = 'Edit a Cliente';
    this.fields = Object.getOwnPropertyNames(Cliente);

    this.fields.forEach(e => {
      this.group = new FormControl('', Validators.required);
    });
    this.data.nascimento = new Date(this.data.nascimento);
    this.clienteForm.patchValue(this.data);

  }


  onCancel(): void {
    this.dialogRef.close();
  }

  refresh() {
    this.ApiService.listClientes().subscribe((res) => {
      this.changeDetectorRefs.detectChanges();
    });
  }


  onSubmit() {
    if (this.clienteForm.valid.valueOf()) { 
      
      var cliente = new Cliente(this.clienteForm.getRawValue());
      var date = moment(this.clienteForm.get('nascimento')?.value).format('L')
      cliente.id = this.data.id;
      cliente.nascimento = date;
      this.ApiService.deletarCliente(cliente)
      .subscribe(r => {         
          this.process = false;
          this.dialogRef.close();
          this.refresh()
          this.snackBar.open('Cliente Successfully Deleted!', '', { duration: 4000 });               
      }, e => {
        this.snackBar.open('Error occurred this process '+e.message + ' '+e.status, '', { duration: 4000 });
      });

  } else {
    this.snackBar.open('Error occurred this process', '', { duration: 4000 });
  }
  }
}