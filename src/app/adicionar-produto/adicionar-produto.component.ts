import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService) {
  }

  produtoForm: FormGroup;
  file: any;

  ngOnInit() {
    if (localStorage.getItem('currentUser') === null || localStorage.getItem('currentUser') === undefined) {
      this.router.navigate(['']);
    }

    this.produtoForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      valor: [null, Validators.required],
      imagemUpload: ['', Validators.required]
    });
  }

  onSubmit() {
    const produto = new Produto();
    produto.nome = this.produtoForm.controls['nome'].value;
    produto.valor = this.produtoForm.controls['valor'].value;

    this.adicionarProduto(produto);
  }

  adicionarProduto(produto: Produto) {

    const formData = new FormData();
    formData.append('Nome', produto.nome);
    formData.append('Valor', produto.valor.toString());
    formData.append('ImagemUpload', this.file);

    this.produtoService.adicionar(formData)
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          alert(error);
        });
  }

  carregarImagem(event: any) {
    this.file = event.target.files[0];
  }

}
