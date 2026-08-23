import { Component, Input } from '@angular/core';
import { IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonTitle, IonButtons, IonButton, IonIcon],
})

export class NavbarComponent {

  // Page title, passed in from whichever page uses the navbar
  // @Input recieves data fro mthe parent component
  // Adapted from Angular.dev, 2026 (https://angular.dev/guide/components/inputs)
  @Input() title: string = '';

  // Router injected so the navbar can manage its own navigation
  constructor(private router: Router) {
    addIcons({ home, heart }); // Registers the icons used in the toolbar
  }

  // Opens the hoem page
  openHome() {
    this.router.navigate(['/home']);
  }

  // Opens the favourites page
  openFavourites() {
    this.router.navigate(['/favourites']);
  }

}
