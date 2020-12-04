import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app.routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ProdutoService } from './service/produto.service';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ListarProdutoComponent,
    AdicionarProdutoComponent,
    EditarProdutoComponent,
    SearchPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [ProdutoService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }