import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiBaseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    const url = `${this.apiBaseUrl}/pokemon?limit=151`;

    return this.http.get(url);
  }

  getPokemonDetail(id: number | string) {
    const url = `${this.apiBaseUrl}/pokemon/${id}`;

    return this.http.get(url);
  }
}
