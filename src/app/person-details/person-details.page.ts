import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardHeader, IonCardTitle, IonCard } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonCard, NavbarComponent]
})
export class PersonDetailsPage implements OnInit {

  // Holds the person whose details are shown. Kept undefined until fetch is complete.
  person: any;

  // The person's movie credits, reuses the Movie type.
  movies: Movie[] = [];

  // ActivatedRoute reads the person's id from the URL, MovieService fetches the data
  // Router navigates to a mvoie's details when one is selected.
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit() {

    // Reads the 'id' route parameter from the URL
    const id = this.route.snapshot.paramMap.get('id');

    // If an id is found, fetches that person's details and their movie credits.
    if (id) {
      this.movieService.getPersonDetails(id).subscribe((response: any) => {
        this.person = response;
        this.movies = response.movie_credits.cast;
      });
    }

  }

openMovie(id: number) {
  this.router.navigate(['/movie-details', id]);
}

}
