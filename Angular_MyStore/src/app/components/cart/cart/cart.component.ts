import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  @Output() user = new EventEmitter();

  totalPrice: number | string = 0;
  totalMoney: number | string = 0;
  amounts: string[] = ['1', '2', '3', '4', '5'];
  selectedAmount: string = '';
  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartProduct();
    this.calculateTotalPrice();
  }

  onSubmitCheckout(value: any) {
    const totalMoney = this.cart.reduce((acc, curr) => {
      return parseFloat((acc + curr.price * Number(curr.amount)).toFixed(2));
    }, 0);

    this.cartService.clearCart();
    this.route.navigate(['/checkoutSuccessfully'], {
      queryParams: { name: value.fullName, totalMoney: totalMoney },
    });
  }

  refresh(): void {
    window.location.reload();
  }

  selectedChangeAmount(value: string, product: Product) {
    const index = this.cart.indexOf(product);
    this.cart[index] = product;
    this.cart[index].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cart));
    this.calculateTotalPrice();
    this.refresh();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((acc, curr) => {
      return parseFloat((acc + curr.price * Number(curr.amount)).toFixed(2));
    }, 0);
  }

  deletedItem(id: number) {
    const storageProducts = this.cartService.getCartProduct();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotalPrice();
  }
}
