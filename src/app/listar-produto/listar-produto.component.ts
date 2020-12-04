import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser') === null || localStorage.getItem('currentUser') === undefined) {
      this.router.navigate(['']);
    }

    this.produtoService.obterTodos()
      .subscribe((data: Produto[]) => {
        this.produtos = data;
      });
  }

  adicionar(): void {
    this.router.navigate(['adicionar-produto']);
  }

  editar(produto: Produto): void {
    this.router.navigate(['editar-produto/' + produto.id]);
  }

  excluir(produto: Produto) {
    this.produtoService.excluir(produto.id)
      .subscribe(data => {
        this.produtos = this.produtos.filter(u => u !== produto);
      });
  }

  obterCaminhoImagem = (imagem: string) => {
    return `https://localhost:5001/Resources/Imagens/${imagem}`;
  }
}
