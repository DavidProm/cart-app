import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItems';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
  }

  onAddcart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id) //=> define una función anónima más corta
    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }]
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id); //filter es el metodo para eliminar o filtrar
    if(this.items.length == 0){
      sessionStorage.removeItem('cart');
    }
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumalator, item) => accumalator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items)); //JSON.stringity convierte un objeto a texto como
  }

}
