import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  name!: string | null;
  totalMoney!: number | string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((routeParams) => {
      this.name = routeParams['name'];
      this.totalMoney = Number(routeParams['totalMoney']).toFixed(2);
    });
  }

  backToProductList():void {
    window.location.href = '/';
  }
}
