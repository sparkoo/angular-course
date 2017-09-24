import { Ingredient } from '../../shared/ingredient.model';
import {
  ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, ShoppingListActions, START_EDIT, STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ],
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case UPDATE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1, action.payload.ingredient);
      return {
        ...state,
        ingredients: ingredients
      };
    case DELETE_INGREDIENT:
      const ingredientsWithoutDeleted = state.ingredients;
      ingredientsWithoutDeleted.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredientsWithoutDeleted
      };
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
