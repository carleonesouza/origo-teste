import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Cliente } from 'src/model/clientes-model';
import { ApiService } from 'src/service/api.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss'],
  providers: [
    {
        provide: MAT_DATE_FORMATS,
        useValue: {
            display: {
                dateInput: 'YYYY-MM-DD',
            },
        },
    },
  ]
})
export class ListarClientesComponent { 

  dataSource!:any;
  title!: string;
  step = 0;
  cols!: any[];
  loading = true;

  columns = [
    { columnDef: 'nome', header: 'Nome', cell: (element: Cliente) => `${element.nome}` },
    { columnDef: 'email', header: 'E-mail', cell: (element: Cliente) => `${element.email}` },
    { columnDef: 'telefone', header: 'Telefone', cell: (element: Cliente) => `${element.telefone}`,  },
    { columnDef: 'estado', header: 'Estado', cell: (element: Cliente) => `${element.estado}` },
    { columnDef: 'nascimento', header: 'Data de Nasc.', cell: (element: Cliente) => `${element.nascimento}` },
    { columnDef: 'actions', header: 'Actions', cell: () => `` },
  ];
   

  displayedColumns = this.columns.map(c => c.columnDef);
  
 

  constructor(public dialog: MatDialog, private ApiService:ApiService) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;


  @Input('choose') choose!: string;


  ngOnInit() {

    this.ApiService.listClientes().subscribe((clientes:Cliente[])=>{
      if(clientes){
        clientes.map((cliente) =>{
          console.log(cliente);
          cliente.telefone = cliente.telefone.replace(/\D/g,'')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
          .replace(/(-\d{4})\d+?$/, '$1'); 
        });
      }
    

      this.dataSource = new MatTableDataSource(clientes);
    });
   
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  startEdit(element: any) {
    this.dialog.open(EditComponent, {
      data: element,
    });
  }

  deleteItem(element: any) {
    this.dialog.open(DeleteComponent, {
      data: element
    });
  }
  

}


