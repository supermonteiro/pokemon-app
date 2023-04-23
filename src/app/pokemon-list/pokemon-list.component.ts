import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  filteredPokemonList: Observable<any[]>;
  favoritePokemonList: any[] = [];
  filterControl = new FormControl('');
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList();

    this.filteredPokemonList = this.filterControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterPokemonList(value))
    );
  }

  getPokemonList(): void {
    this.pokemonService.getPokemonList().subscribe(
      (response: any) => {
        this.pokemonList = response.results;
      },
      (error) => console.error(error)
    );
  }

  filterPokemonList(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filterValue)
    );
  }

  addToFavorites(pokemon: any): void {
    if (!this.isFavorite(pokemon)) {
      this.favoritePokemonList.push(pokemon);
    }
  }

  removeFromFavorites(pokemon: any): void {
    const index = this.favoritePokemonList.findIndex(
      (favorite) => favorite.name === pokemon.name
    );

    if (index >= 0) {
      this.favoritePokemonList.splice(index, 1);
    }
  }

  isFavorite(pokemon: any): boolean {
    return this.favoritePokemonList.some(
      (favorite) => favorite.name === pokemon.name
    );
  }  
}
