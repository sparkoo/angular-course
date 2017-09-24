import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AddIngredient, DeleteIngredients, UpdateIngredient, StopEdit
} from '../store/shopping-list.actions';
import { AppState } from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;
  editMode = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editMode = true;
            const editedIngredient = data.ingredients[data.editedIngredientIndex];
            this.shoppingItemForm.form.patchValue(
              {
                name: editedIngredient.name,
                amount: editedIngredient.amount
              }
            );
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit() {
    const newIngredient = new Ingredient(this.shoppingItemForm.value.name, this.shoppingItemForm.value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.clearForm();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredients());
    this.clearForm();
  }

  onClear() {
    this.clearForm();
  }

  clearForm() {
    this.shoppingItemForm.reset();
    this.editMode = false;
  }


  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
  }
}
