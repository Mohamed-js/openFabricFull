import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  productForm!: FormGroup;
  product: any = [];
  response: any;

  constructor(private fb: FormBuilder, private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });

    this.route.params.subscribe(params => {
      this.productsService.getProduct(params['id']).subscribe(data => {
        this.product = data;
        this.productForm.patchValue({
          title: this.product.title,
          description: this.product.description,
          price: this.product.price,
        })
      });
    });


  }

  onSubmit() {
    this.productsService.updateProduct(this.productForm.value, this.product._id).subscribe(res => {
      this.response = res;
      if(this.response.message === "Product updated."){
        this.router.navigate([`/products/${this.product._id}`])
      }
    });
  }
}
