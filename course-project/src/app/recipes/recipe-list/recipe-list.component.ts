import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesFeatureState, RecipesState } from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ]
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<RecipesState>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<RecipesFeatureState>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate([ 'new' ], { relativeTo: this.route });
  }
}
