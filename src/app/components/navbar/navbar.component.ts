import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl : './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: CartItem[] = [];

}
