import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignupUserRequest } from '../../models/interfaces/user/SignUpUserRequest';

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
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService) {}

    //metodo submit para o form de login
    onSubmitLoginForm(): void {
      console.log("dados do form", this.loginForm.value);
    }

    //metodo submit para o form de signup
    onSubmitSignupForm(): void {
      if(this.signupForm.value && this.signupForm.valid) {
        this.UserService.signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if(response){
              alert("usuario teste criado!");
            }
          },
          error: (err) => console.log(err),
        });

      }
    }
}
