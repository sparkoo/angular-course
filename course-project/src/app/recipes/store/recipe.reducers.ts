import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE } from './recipe.actions';
import { AppState } from '../../store/app.reducers';

export interface RecipesFeatureState extends AppState {
  recipes: RecipesState;
}

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

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = { ...recipe, ...action.payload.newRecipe };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
