import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesFeatureState, RecipesState } from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { AddRecipe, UpdateRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;

  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipesFeatureState>) {
  }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(+params[ 'id' ])
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe((recipesState: RecipesState) => {
          const recipe = recipesState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
