import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItems';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private store: Store<{ items: ItemsState }>,
    private router: Router,
    private sharingDataService: SharingDataService,) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.saveSession();
    });
  }

  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddcart();
  }

  onAddcart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      this.store.dispatch(add({ product }));
      this.store.dispatch(total());

      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Shopping",
        text: "Nuevo producto agregado el carro!",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log(id + 'se ha ejecutado el evento idProductEventEmitter')
      Swal.fire({
        title: "Estas seguro que deseas eliminar?",
        text: "Cuidado el producto se eliminara del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, hazlo!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());

          this.router.navigate(['/cart']);
          
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto",
            icon: "success"
          });
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items)); //JSON.stringity convierte un objeto a texto como
  }

}
