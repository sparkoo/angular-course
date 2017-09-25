import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [
    new Recipe('A Test Recipe', 'This is simply a test',
      'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
      [new Ingredient('salt', 3), new Ingredient('bread', 1)]),
    new Recipe('Spaghetti', 'Bla bla spagety',
      'http://img.blesk.cz/img/1/full/2170551-img-amatriciana-spagety-testoviny-omacka-rajcata-bazalka.jpg', [])
  ]
};

export function recipeReducer(state, action) {
  return state;
}
