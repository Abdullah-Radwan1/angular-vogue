import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true, // 👈 required
  imports: [RouterOutlet, HeaderComponent], // 👈 header registered here
  templateUrl: './app.html', // 👈 separate line, correct
  styleUrls: ['./app.scss'], // 👈 must be "styleUrls"
})
export class App {
  protected readonly title = signal('ang-ecommerce');
}
