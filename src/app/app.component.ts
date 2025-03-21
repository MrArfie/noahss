import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <router-outlet></router-outlet> <!-- This is where page content will load -->
    </div>
    <app-footer></app-footer>
  `
})
export class AppComponent { }
