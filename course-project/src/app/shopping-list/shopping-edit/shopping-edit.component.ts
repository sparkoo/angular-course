import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;
  private editSubscription: Subscription;
  editMode = false;
  private editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(this.fillEdit.bind(this));
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  fillEdit(index: number) {
    this.editedItemIndex = index;
    this.editMode = true;
    const editingItem = this.shoppingListService.getIngredient(index);
    this.shoppingItemForm.form.patchValue(
      {
        name: editingItem.name,
        amount: editingItem.amount
      }
    );
  }

  onSubmit() {
    const newIngredient = new Ingredient(this.shoppingItemForm.value.name, this.shoppingItemForm.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clearForm();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.clearForm();
  }

  onClear() {
    this.clearForm();
  }

  clearForm() {
    this.shoppingItemForm.reset();
    this.editMode = false;
    this.editedItemIndex = null;
  }
}
