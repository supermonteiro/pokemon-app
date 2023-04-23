import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon/pokemon.module';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Set<number> = new Set<number>();

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = new Set<number>(JSON.parse(storedFavorites));
    }
  }

  getFavorites(): Set<number> {
    return this.favorites;
  }

  addFavorite(id: number): void {
    this.favorites.add(id);
    localStorage.setItem(
      'favorites',
      JSON.stringify(Array.from(this.favorites))
    );
  }

  removeFavorite(id: number): void {
    this.favorites.delete(id);
    localStorage.setItem(
      'favorites',
      JSON.stringify(Array.from(this.favorites))
    );
  }

  isFavorite(id: number): boolean {
    return this.favorites.has(id);
  }
}
