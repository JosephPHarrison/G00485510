import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonHeader } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';
import { Movie } from '../models/movie.model';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, NavbarComponent, IonHeader]
})
export class FavouritesPage {

  // Holds the favourites array, loaded each time the page opens
  favourites: Movie[] = [];

  constructor(private favouritesService: FavouritesService, private router: Router) { }

  // Runs each time the page is opened allowing for the list to refresh after each change
  async ionViewWillEnter() {
    this.favourites = await this.favouritesService.getFavourites();
  }

  // Opens the Movie Details page for the selected favourite
  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

}
