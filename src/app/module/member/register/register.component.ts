import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallService } from 'src/app/services/call.service';
import { UrlConfigService } from 'src/app/services/url-config.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signup: false;
  submitted = false;
  spinner = false;
  registerForm: FormGroup;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CallService,
    private url: UrlConfigService,
    private messageService: MessageService,
    private api: CallService

  ) {

  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.api.validUser()) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/home']);
    }
    this.createForm();
  }

  get login() { return this.loginForm.controls; }

  loginSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const urlString = '?username=' + this.loginForm.value.username +
      '&password=' + this.loginForm.value.password;
      this.spinner = true;
       /* Api call*/
      this.api.getList(this.url.urlConfig().userLogin.concat(urlString)).subscribe(res => {
        this.spinner = false;
        if (res.length) {
          sessionStorage.setItem('currentUser', JSON.stringify(res[0]));
          this.router.navigate(['/home']);
          console.log('currentUser', sessionStorage);
        } else {
      this.messageService.add({severity: 'error', summary: 'Login Failed', detail: 'Invalid Username or Password'});

        }
      },
      error => {
        this.spinner = false;
      });
    }
  }

  registerUser() {
    this.signup = false;
    this.apiAction(this.url.urlConfig().userLogin, this.registerForm.value, 'post');
    this.messageService.add({severity: 'success', summary: 'Registered Succesfully', detail: 'succesfully registered with username'});
    this.registerForm.reset();

  }
  private apiAction(url: string, data, method: string): void {
    this.service.postCall(url, data, method).subscribe(res => {
    });
  }
}
