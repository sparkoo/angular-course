import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: [ './recipe-edit.component.css' ]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;

  private id: number;
  private editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(+params[ 'id' ])
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params[ 'id' ];
        this.editMode = params[ 'id' ] != null;
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
