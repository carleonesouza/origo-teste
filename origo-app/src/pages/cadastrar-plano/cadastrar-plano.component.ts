import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plano } from 'src/model/planos-model';
import { ApiService } from 'src/service/api.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cadastrar-plano',
  templateUrl: './cadastrar-plano.component.html',
  styleUrls: ['./cadastrar-plano.component.scss'],
  providers:[CurrencyPipe]
})
export class CadastrarPlanoComponent implements OnInit {
  @Input() planoForm!: FormGroup;
  planos!: Plano[];
  process=false;

  constructor(private formBuilder: FormBuilder, private ApiService: ApiService,
    private currencyPipe: CurrencyPipe, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.planoForm = this.formBuilder.group({
      plano: ['', [Validators.required, Validators.minLength(3)]],
      mensalidade: [0.0, [Validators.required, Validators.minLength(3)]],
  
    });
    this.planoForm.get('mensalidade')?.valueChanges.subscribe(valor =>{
      if(valor){
        this.planoForm.patchValue({
          mensalidade: this.currencyPipe.transform(valor.replace(/\D/g,'').replace(/^0+/,''), 'BRL', 'symbol-narrow', '2.0-1', 'pt-br')
        }, {emitEvent:false});
      }
     
    });
    
  }

  get plano() { return this.planoForm.get('plano'); }
  get mensalidade() { return this.planoForm.get("mensalidade"); }


    
  onSubmit() {
    if (this.planoForm.valid.valueOf()) {    

      var plano = new Plano(this.planoForm.getRawValue());     
      plano.mensalidade = Number.parseFloat(String(this.planoForm.get('mensalidade')?.value).replace('R$', ''));
      
      this.ApiService.planoCreate(plano)
      .subscribe(r => {  
        if(r){
          this.process = false;
          this.snackBar.open('Plano Successfully Registred!', '', { duration: 4000 });
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
