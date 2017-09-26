import { Actions, Effect } from '@ngrx/effects';
import { FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES } from './recipe.actions';
import { Recipe } from '../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipesFeatureState} from './recipe.reducers';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffects {
  recipesURL = 'https://ng-recipe-book-c7636.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$
    .ofType(FETCH_RECIPES)
    .switchMap((actions: FetchRecipes) =>
      this.httpClient.get<Recipe[]>(this.recipesURL)
    )
    .map((recipes) => {
      return {
        type: SET_RECIPES,
        payload: recipes
      };
    });

  @Effect()
  recipeStore = this.actions$
    .ofType(STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', this.recipesURL, state.recipes,
        { reportProgress: true });
      return this.httpClient.request(req);
    });


  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<RecipesFeatureState>) {}
}
