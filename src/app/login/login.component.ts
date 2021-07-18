import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  user:User;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authenticate()

  }
  async authenticate() {
    await this.authService.authenticateUser(this.loginForm.value).then(
      (data) => {
          console.log(data);
          this.tokenStorageService.saveAuthToken(data.accessJwt);
          this.tokenStorageService.saveRefreshToken(data.refreshJwt);
          this.router.navigateByUrl('hello');
      }
    ).catch((error)=> {
      console.log("error occured during authenticate " + JSON.stringify(error));
      this.router.navigateByUrl("");
    });
  }
}
