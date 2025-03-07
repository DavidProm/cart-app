import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItems';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  @Input() items: CartItem[] = [];
  @Input() total = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id : number) {
    this.idProductEventEmitter.emit(id);
  }
}
