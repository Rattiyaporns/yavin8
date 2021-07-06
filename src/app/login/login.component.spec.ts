import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { OokbeeService } from '../services/ookbee.service';
import { RouterTestingModule } from '@angular/router/testing';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, RouterTestingModule],
      providers: [
        { provide: OokbeeService, useValue: loginServiceSpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('created a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    expect(usernameContainer).toBeDefined();
  });

  it('should create check input form', () => {
    const loginForm = component.loginForm;
    const loginFormValue = {
      username: '',
      password: ''
    }
    expect(loginForm.value).toEqual(loginFormValue);
  });
});
