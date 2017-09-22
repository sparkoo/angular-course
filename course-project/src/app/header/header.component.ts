import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipeService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSave() {
    this.recipeService.saveRecipes();
  }

  onFetch() {
    this.recipeService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
