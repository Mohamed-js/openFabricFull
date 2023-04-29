import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  base: string = isDevMode() ? "http://localhost:3000" : "https://openfabricapi.onrender.com"

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(`${this.base}/products/`,{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }

  getProduct(id: String) {
    return this.http.get(`${this.base}/products/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }

  createProduct(val:any){
    return this.http.post(`${this.base}/products/`,
      val, {
      headers: {
        "Accept": "application/json",
      }
    }
   );
  }

  updateProduct(body: any, id: string){
    return this.http.patch(`${this.base}/products/${id}`,
      body, {
      headers: {
        "Content-Type": "application/json",
      }
    }
   );
  }
}
