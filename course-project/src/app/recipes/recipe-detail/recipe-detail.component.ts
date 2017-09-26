import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { RecipesFeatureState, RecipesState } from '../store/recipe.reducers';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipesState>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipesFeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      });
  }

  onToShoppingList() {
    this.store.select('recipes').take(1)
      .subscribe((recipesState: RecipesState) =>
        this.store.dispatch(new AddIngredients(recipesState.recipes[this.id].ingredients)));
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }
}
