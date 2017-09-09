import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient) {
    this._ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
