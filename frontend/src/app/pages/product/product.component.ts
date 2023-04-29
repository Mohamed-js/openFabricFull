import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: any = [];

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit () {
    this.route.params.subscribe(params => {
      this.productsService.getProduct(params['id']).subscribe(data => {
        this.product = data;
      });
    });
  }
}
