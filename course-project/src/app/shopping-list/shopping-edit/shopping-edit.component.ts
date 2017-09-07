import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient() {
    this.shoppingListService.addIngredient(
      new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }
}
