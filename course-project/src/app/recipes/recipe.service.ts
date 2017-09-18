import { Recipe } from './recipe.model';
import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class RecipeService {
  recipesURL = 'https://ng-recipe-book-c7636.firebaseio.com/recipes.json';

  recipesChanged = new Subject<Recipe[]>();


  constructor(private shoppingListService: ShoppingListService,
              private http: Http) {
  }

  private _recipes: Recipe[] = [
    // new Recipe('A Test Recipe', 'This is simply a test',
    //   'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
    //   [new Ingredient('salt', 3), new Ingredient('bread', 1)]),
    // new Recipe('Spaghetti', 'Bla bla spagety',
    //   'http://img.blesk.cz/img/1/full/2170551-img-amatriciana-spagety-testoviny-omacka-rajcata-bazalka.jpg', [])
  ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
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
    this.http.put(this.recipesURL, this.recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.http.get(this.recipesURL)
      .map((response: Response) => response.json())
      .subscribe((response: Recipe[]) => {
        this._recipes = response;
        this.recipesChanged.next(this.recipes);
      });
  }
}
