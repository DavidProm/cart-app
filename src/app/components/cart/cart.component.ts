import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItems';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  items: CartItem[] = [];

  total = 0;

  idProductEventEmitter = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
