import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../auth/store/auth.reducers';
import { SignOut } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private recipeService: RecipeService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.recipeService.saveRecipes();
  }

  onFetch() {
    this.recipeService.fetchRecipes();
  }

  onLogout() {
    this.store.dispatch(new SignOut());
  }
}
