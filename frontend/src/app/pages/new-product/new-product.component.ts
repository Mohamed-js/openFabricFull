import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})

export class NewProductComponent {
  productForm!: FormGroup;
  image: Blob | string = '';
  response: any;

  constructor(private fb: FormBuilder, private productsService: ProductsService,  private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      image: ['', [Validators.required]]
    });
  }


  onSubmit(e: any) {
    const fd = new FormData()
    Object.entries(this.productForm.value).forEach(val => {
      if(val[0] != "image") fd.append(val[0], val[1] as string)
    })
    fd.append('image', this.image)
    this.productsService.createProduct(fd).subscribe(res => {
      this.response = res;
      if(this.response.message === "Product created."){
        this.router.navigate([`/products`])
      }
    });
  }

  onFileSelect(input: any){
    if (input.files.length > 0) {
      this.image = input.files[0];
    }
  }
}
