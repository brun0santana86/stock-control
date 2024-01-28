import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    nameSignup: ['', Validators.required],
    emailSignup: ['', Validators.required],
    passwordSignup: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

    //metodo submit para o form de login
    onSubmitLoginForm(): void {
      console.log("dados do form", this.loginForm.value);
    }

    //metodo submit para o form de signup
    onSubmitSignupForm(): void {
      console.log("dados do form", this.signupForm.value);
    }
}
