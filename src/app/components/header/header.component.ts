import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ShoppingBag,
  Search,
  LucideAngularModule,
  Menu,
  Heart,
  RadioReceiver,
  Sofa,
  Clock,
  LampCeiling,
  Coffee,
} from 'lucide-angular';
import { cartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartStore = inject(cartStore);
  constructor() {}

  ShoppingBag = ShoppingBag;
  Search = Search;
  Menu = Menu;
  Heart = Heart;
  RadioReceiver = RadioReceiver;
  Sofa = Sofa;
  Clock = Clock;
  LampCeiling = LampCeiling;
  Coffee = Coffee;
}
