import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonEditDialogComponent } from '../pokemon-edit-dialog/pokemon-edit-dialog.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  loading = true;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe((pokemon) => {
      this.pokemon = pokemon;
    });
  }

  getPokemonDetails(id: string): void {
    this.pokemonService.getPokemonDetail(id).subscribe(
      (response: any) => {
        this.pokemon = response;
        this.loading = false;
      },
      (error) => console.error(error)
    );
  }  

  toggleFavorite(): void {
    if (this.favoriteService.isFavorite(this.pokemon.id)) {
      this.favoriteService.removeFavorite(this.pokemon.id);
    } else {
      this.favoriteService.addFavorite(this.pokemon.id);
    }
  }

  saveChanges(pokemon: Pokemon): void {
    this.pokemonService.updatePokemon(pokemon).subscribe();
  }

  addComment(pokemon: any, comment: string): void {
    if (comment) {
      if (!pokemon.comments) {
        pokemon.comments = [];
      }

      pokemon.comments.push(comment);
      this.newComment = '';
    }
  }

  openEditDialog(): void {
   const dialogRef = this.dialog.open(PokemonEditDialogComponent, {
     width: '400px',
     data: { pokemon: this.pokemon }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.pokemonService.updatePokemon(result).subscribe(pokemon => {
         this.pokemon = pokemon;
       });
     }
   });
 }
}
}
