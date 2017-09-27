import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    dataService = fixture.debugElement.injector.get(DataService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should use username from the service', () => {
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display username if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('p').textContent).toContain(component.user.name);
  });

  it('shouldnt display username if user is logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('p').textContent).not.toContain(component.user.name);
  });

  it('shouldnt fetch data successfully if not called async', () => {
    spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBeUndefined();
  });

  it('should fetch data successfully if called async', async(() => {
    spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('blabol'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('blabol');
    });
  }));

  it('should fetch data successfully if called fake async', fakeAsync(() => {
    spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('blabol'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('blabol');
  }));
});
