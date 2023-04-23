import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-edit-dialog',
  templateUrl: './pokemon-edit-dialog.component.html',
  styleUrls: ['./pokemon-edit-dialog.component.css'],
})
export class PokemonEditDialogComponent {
  pokemonForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PokemonEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pokemon: Pokemon }
  ) {
    this.pokemonForm = this.formBuilder.group({
      name: [data.pokemon.name, Validators.required],
      imageUrl: [data.pokemon.imageUrl, Validators.required],
      height: [data.pokemon.height, Validators.required],
      weight: [data.pokemon.weight, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.pokemonForm.valid) {
      const updatedPokemon: Pokemon = {
        ...this.data.pokemon,
        ...this.pokemonForm.value,
      };
      this.dialogRef.close(updatedPokemon);
    }
  }
}
