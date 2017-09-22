import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  private projectForm: FormGroup;

  readonly projectStatuses = [ 'Stable', 'Critical', 'Finished' ];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, [ Validators.required/*, this.invalidNameValidator*/ ], this.invalidNameAsyncValidator),
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'status': new FormControl(this.projectStatuses[ 0 ])
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    console.log(this.projectForm.value);
  }

  invalidNameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { 'invalidName': true };
    }
    return null;
  }

  invalidNameAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) =>
      setTimeout(() =>
          control.value === 'Test' ? resolve({ 'emailIsForbidden': true }) : resolve(null)
        , 1500));
  }
}
