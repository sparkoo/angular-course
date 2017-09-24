import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipesURL = 'https://ng-recipe-book-c7636.firebaseio.com/recipes.json';

  recipesChanged = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient) {}

  private _recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [new Ingredient('salt', 3), new Ingredient('bread', 1)]),
    new Recipe('Spaghetti', 'Bla bla spagety',
      'http://img.blesk.cz/img/1/full/2170551-img-amatriciana-spagety-testoviny-omacka-rajcata-bazalka.jpg', [])
  ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    console.log('adding recipe');
    console.log(recipe);
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this._recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(id: number) {
    this._recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes);
  }

  saveRecipes() {
    const req = new HttpRequest('PUT', this.recipesURL, this.recipes,
      { reportProgress: true });
    this.httpClient.request(req)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(this.recipesURL)
      .subscribe((recipes) => {
        this._recipes = recipes;
        this.recipesChanged.next(this.recipes);
      });
  }
}
