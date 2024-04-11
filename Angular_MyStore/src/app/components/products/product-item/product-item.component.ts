import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  faCartPlus = faCartPlus;

  selectedAmount: string = '1';
  selectAmounts: string[] = ['1', '2', '3', '4', '5'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  selectedChangeAmount(value: any) {
    this.selectedAmount = value;
  }

  addToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((prod) => prod.id === product.id);

    if (productInCart) {
      productInCart.amount = this.selectedAmount;
      productInCart ? this.productService.addProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedAmount }));
      this.productService.addProduct(cartProducts);
      const msg = `${product.name} has been added to your cart.`;
      alert(msg);
    }

    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
