// import { Component, Input, OnInit } from '@angular/core';
// import { PRODUCTS } from 'src/app/mock-products';
// import { Product } from 'src/app/product';
// import { ProductService } from 'src/app/services/product.service';
// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.getProducts();
//   }

//   getProducts(): void {
//     this.productService.getProducts()
//       .subscribe(products => {
//         this.products = products;
//       })
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => console.log(err),
      });
  }
}
