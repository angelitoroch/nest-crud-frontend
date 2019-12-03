import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  //Metodo qu regresara un Observable con un arreglo de productos
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(environment.BASE_URL + "/product");
  }

  getProduct(id: string): Observable<Product> {
    return this._http.get<Product>(environment.BASE_URL + "/product/" + id);
  }

  createProduct(product: Product): Observable<Product> {
    console.log(product);
    return this._http.post<Product>(environment.BASE_URL + "/product/create", product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this._http.delete<Product>(
      environment.BASE_URL + "/product/delete?productID=" + id
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this._http.put<Product>(
      environment.BASE_URL + "/product/update?productID=" + id,
      product
    );
  }
}
