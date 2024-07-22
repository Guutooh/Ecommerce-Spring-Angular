import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base da API de produtos
  private baseUrl = 'http://localhost:8080/api/products';

  // Injeção do serviço HttpClient
  constructor(private httpClient: HttpClient) { }

  // Método para obter a lista de produtos
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl) // Faz uma requisição GET e espera um GetResponse
      .pipe(
        map(response => response._embedded.products) // Transforma a resposta para extrair a lista de produtos
      );
  }
}

// Interface que descreve a estrutura da resposta da API
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}