import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-comments',
  templateUrl: './pokemon-comments.component.html',
  styleUrls: ['./pokemon-comments.component.css'],
})
export class PokemonCommentsComponent implements OnInit {
  comments: string[] = [];
  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  addComment(): void {
    const comment = this.commentForm.get('comment').value;
    this.comments.push(comment);
    this.commentForm.reset();
  }
}
