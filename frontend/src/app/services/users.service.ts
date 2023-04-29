import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  base: string = "https://openfabricapi.onrender.com"
  constructor(private http: HttpClient) { }

  signUp(body: any){
    return this.http.post(`${this.base}/registrations/`,
      body, {
      headers: {
        "Content-Type": "application/json",
      }
    }
   );
  }

  login(body: any){
    return this.http.post(`${this.base}/sessions/`,
      body, {
      headers: {
        "Content-Type": "application/json",
      }
    }
   );
  }

  saveToken(token: string){
    localStorage.setItem("openFabricToken", token)
  }
}
