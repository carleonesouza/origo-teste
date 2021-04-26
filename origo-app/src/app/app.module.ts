import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule} from '../../app-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from "@angular/material/dialog";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthService } from 'src/service/auth.service';
import { AuthGuard } from 'src/guards/authGuard';
import { AppService } from 'src/service/app.service';
import { BaseComponent } from './base.component';
import { AddContaComponent } from 'src/pages/add-conta/add-conta.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ListarClientesComponent } from '../pages/listar-clientes/listar-clientes.component';
import { ListarPlanosComponent } from '../pages/listar-planos/listar-planos.component';
import { CadastrarClienteComponent } from '../pages/cadastrar-cliente/cadastrar-cliente.component';
import { CadastrarPlanoComponent } from '../pages/cadastrar-plano/cadastrar-plano.component';
import { ApiService } from 'src/service/api.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EditComponent } from '../pages/edit/edit.component';
import { DeleteComponent } from '../pages/delete/delete.component'
import { CurrencyPipe } from '@angular/common';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseComponent,   
    LoginComponent,
    AddContaComponent,
    DashboardComponent,
    MainNavComponent,
    ListarClientesComponent,
    ListarPlanosComponent,
    CadastrarClienteComponent,
    CadastrarPlanoComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule ,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgxMaskModule.forRoot(maskConfig),
    
  ],  
  providers: [AppService,AuthService,AuthGuard, ApiService,{provide: LOCALE_ID, useValue: 'pt' } ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
