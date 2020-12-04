import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'listar-produto', component: ListarProdutoComponent },
    { path: 'adicionar-produto', component: AdicionarProdutoComponent },
    { path: 'editar-produto/:id', component: EditarProdutoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }  