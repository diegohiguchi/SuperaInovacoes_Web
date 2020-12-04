import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto.model';

@Injectable()
export class ProdutoService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:5001/api/produtos';

    obterTodos() {
        return this.http.get<Produto[]>(this.baseUrl);
    }

    obterPorId(id: any) {
        return this.http.get<Produto>(this.baseUrl + '/' + id);
    }

    adicionar(produto: any) {
        return this.http.post<any>(this.baseUrl, produto);
    }

    editar(id: any, produto: any) {
        console.log(produto);
        return this.http.put<any>(this.baseUrl + '/' + id, produto);
    }

    excluir(id: any) {
        return this.http.delete(this.baseUrl + '/' + id);
    }
}
