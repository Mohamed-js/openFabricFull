import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  productForm!: FormGroup;
  response: any;
  token: string = "";
  error: string = "";
  constructor(private fb: FormBuilder, private usersService: UsersService,  private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit() {
    this.usersService.login(this.productForm.value).subscribe(res => {
      this.response = res;
      if(this.response.message === "Logged in successfully."){
        this.token = this.response.token;
        this.usersService.saveToken(this.token);
        this.router.navigate([`/products`])
      }
    }, (e) => {
      if(e.error.error){
        this.error = e.error.error;
      } else {
        this.error = e.error;
      }
    });
  }
}
