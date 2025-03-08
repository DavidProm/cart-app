import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItems';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService, 
    private service: ProductService) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddcart();
  }

  onAddcart(): void {
    this.sharingDataService.productEventEmitter.subscribe( product => {
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
      this.router.navigate(['/cart'],{
        state: {items: this.items, total: this.total}
      })
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
          this.items = this.items.filter(item => item.product.id !== id); //filter es el metodo para eliminar o filtrar
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'],{
              state: {items: this.items, total: this.total}
            })
          })
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto",
            icon: "success"
          });
        }
      });
    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumalator, item) => accumalator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items)); //JSON.stringity convierte un objeto a texto como
  }

}
