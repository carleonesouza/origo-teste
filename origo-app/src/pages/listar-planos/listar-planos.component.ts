import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Plano } from 'src/model/planos-model';
import { ApiService } from 'src/service/api.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-listar-planos',
  templateUrl: './listar-planos.component.html',
  styleUrls: ['./listar-planos.component.scss'],
  providers: [CurrencyPipe]
})
export class ListarPlanosComponent implements OnInit {
   
  planos!: Plano[];
  title!: string;
  step = 0;
  cols!: any[];
  loading = true;

  columns = [
    { columnDef: 'plano', header: 'Plano', cell: (element: Plano) => `${element.plano}` },
    { columnDef: 'mensalidade', header: 'Mensalidade', cell: (element: Plano) => `${element.mensalidade}` },
    { columnDef: 'actions', header: 'Actions', cell: () => `` },
  ];
   

  displayedColumns = this.columns.map(c => c.columnDef);
  displayedColumn: string[] = ['plano', 'mensalidade'];




  constructor(public dialog: MatDialog, private ApiService:ApiService) {
    this.planos = [];
   }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  @Input('choose') choose!: string;


  ngOnInit() {
    this.ApiService.listPlanos().subscribe((planos) =>{
       this.planos = planos;
    });     
  }

  
   
  

}
