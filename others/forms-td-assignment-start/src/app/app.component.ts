import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;

  private formData: { email: string, subscription: string, password: string };
  defaultSubscription = 'advanced';

  onSubmit() {
    console.log(this.signupForm);
    this.formData = {
      email: this.signupForm.value.email,
      subscription: this.signupForm.value.subscription,
      password: this.signupForm.value.password
    };
    this.signupForm.reset({ subscription: this.defaultSubscription });
  }
}
