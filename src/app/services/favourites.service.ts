import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Movie } from '../models/movie.model';


@Injectable({
  providedIn: 'root',
})
export class FavouritesService {

  // Storage injected here, init() prepares it for use
  constructor(private storage: Storage) {
    this.init();
  }

  // create() must be called before any read or write can occur
  async init() {
    await this.storage.create();
  }

  // Returns the full array lsit of favourite movies
  // If none have been saved, then storage returns null and the app falls back to an empty array 
  async getFavourites(): Promise<Movie[]> {
    const favourites = await this.storage.get('favourites');
    return favourites || [];
  }

  // Adds a movie to the favourites lsit, then saves teh list
  async addFavourite(movie: Movie) {
    const favourites = await this.getFavourites();
    favourites.push(movie);
    await this.storage.set('favourites', favourites);
  }

  // Removes a movie from the favourites list absed on its id, then saves the list
  async removeFavourite(id: number) {
    let favourites = await this.getFavourites();
    favourites = favourites.filter(movie => movie.id !== id);
    await this.storage.set('favourites', favourites);
  }

  // Check to see whether a movie is on the favourites list or not, returnign true or false
  async isFavourite(id: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(movie => movie.id === id);
  }

}
