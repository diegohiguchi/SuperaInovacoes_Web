import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute) {
  }

  produtoForm: FormGroup;
  file: any;
  id: any;
  produto: Produto;
  mostraImagem: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('currentUser') === null || localStorage.getItem('currentUser') === undefined) {
      this.router.navigate(['']);
    }

    this.id = this.route.snapshot.params['id'];

    this.produtoForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      valor: [null, Validators.required],
      imagemUpload: ['', Validators.required]
    });

    this.obterProduto(this.id);
  }

  obterProduto(id: any) {
    this.produtoService.obterPorId(id)
      .subscribe(data => {
        this.produto = data;
        this.produtoForm.controls['nome'].setValue(this.produto.nome);
        this.produtoForm.controls['valor'].setValue(this.produto.valor);

        this.mostraImagem = true;
      });
  }

  onSubmit() {
    const produto = new Produto();
    produto.id = this.id;
    produto.nome = this.produtoForm.controls['nome'].value;
    produto.valor = this.produtoForm.controls['valor'].value;

    this.editarProduto(produto);
  }

  editarProduto(produto: Produto) {

    const formData = new FormData();
    formData.append('Id', produto.id.toString());
    formData.append('Nome', produto.nome);
    formData.append('Valor', produto.valor.toString());
    formData.append('ImagemUpload', this.file);

    this.produtoService.editar(produto.id, formData)
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

  obterCaminhoImagem = (imagem: string) => {
    return `https://localhost:5001/Resources/Imagens/${imagem}`;
  }

}
