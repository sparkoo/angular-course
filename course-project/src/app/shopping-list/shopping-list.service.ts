import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient) {
    this._ingredients.push(newIngredient);
    this.ingredientsChanged.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients);
  }
}
