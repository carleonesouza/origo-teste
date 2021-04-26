import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/authGuard';
import { CadastrarClienteComponent } from 'src/pages/cadastrar-cliente/cadastrar-cliente.component';
import { CadastrarPlanoComponent } from 'src/pages/cadastrar-plano/cadastrar-plano.component';
import { EditComponent } from 'src/pages/edit/edit.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { ListarClientesComponent } from 'src/pages/listar-clientes/listar-clientes.component';
import { ListarPlanosComponent } from 'src/pages/listar-planos/listar-planos.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { BaseComponent } from './base.component';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'lista-plano', component: ListarPlanosComponent, canActivate: [AuthGuard] },
  { path: 'lista-cliente', component: ListarClientesComponent, canActivate: [AuthGuard] },
  { path: 'cadastra-cliente', component: CadastrarClienteComponent, canActivate: [AuthGuard] },
  { path: 'cadastra-plano', component: CadastrarPlanoComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
 
   // otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
