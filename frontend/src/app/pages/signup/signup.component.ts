import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  productForm!: FormGroup;
  response: any;
  token: string = '';
  error: string = '';
  constructor(private fb: FormBuilder, private usersService: UsersService,  private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.usersService.signUp(this.productForm.value).subscribe(res => {
      this.response = res;
      if(this.response.message === "Signed up successfully."){
        this.token = this.response.token;
        this.usersService.saveToken(this.token);
        this.router.navigate([`/products`])
      }
    }, (e) => {
      if(e.error.error){
        this.error = e.error.error;
      } else if (e.error.errors){
        this.error = e.error.errors[0];
      } else {
        this.error = e.error;
      }
    });
  }
}
