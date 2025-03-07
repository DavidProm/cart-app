import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItems';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges {

  @Input() items: CartItem[] = [];
  total = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items']; //let se usa para declarar una variable que solo se puede acceder en ese bloque
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumalator, item) => accumalator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items)); //JSON.stringity convierte un objeto a texto como
  }
}
