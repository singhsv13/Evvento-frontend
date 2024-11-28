import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loggIn: boolean = false;
  isLoginMode: boolean = true;

  authForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Login Form
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    // Registration Form
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;

    console.log('Mode : ', this.isLoginMode);

    // Optional: Logic to switch form validators if needed.
    // if (this.isLoginMode) {
    //   this.authForm.get('name').clearValidators();
    // } else {
    //   this.authForm.get('name').setValidators([Validators.required]);
    // }
    // this.authForm.get('name').updateValueAndValidity();
  }

  onFormSubmit() {
    if (this.isLoginMode) {
      // Login Mode
      if (this.authForm.valid) {
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;
        this.onLoginClicked(email, password);
        this.authForm.reset();
      }
    } else {
      // Registration Mode
      if (this.registerForm.valid) {
        const name = this.registerForm.value.name;
        const email = this.registerForm.value.email;
        const password = this.registerForm.value.password;
        this.onRegisterClicked(name, email, password);
        this.registerForm.reset();
      }
    }
  }

  onLoginClicked(email: string, password: string) {
    let user : User = this.authservice.logIn(email, password);
    if (user === undefined) {
      alert('Invalid Login Credentials !!!');
    } else {
      alert(`Welcome ${user.name}, You are Logged In!!!`);
      this.router.navigate(['profile']);
    }
  }

  onRegisterClicked(name: string, email: string, password: string) {
    let user : User = this.authservice.registerUser(name, email, password);
    console.log('New User : ', user);
    if (user === undefined) {
      alert('Registration Failed. User Already Exists !!!');
    } else {
      alert(`Welcome ${user.name}, You have successfully registered!`);
      this.router.navigate(['profile']);
    }
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/User';
// import { AuthService } from 'src/app/services/auth.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loggIn: boolean = false;
//   isLoginMode: boolean = true;

//   authForm: FormGroup;
//   registerForm: FormGroup;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     // Login Form
//     this.authForm = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required]),
//     });

//     // Registration Form
//     this.registerForm = new FormGroup({
//       name: new FormControl('', [Validators.required]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required]),
//     });
//   }

//   switchMode() {
//     this.isLoginMode = !this.isLoginMode;
//   }

//   onFormSubmit() {
//     if (this.isLoginMode) {
//       if (this.authForm.valid) {
//         const email = this.authForm.value.email;
//         const password = this.authForm.value.password;
//         this.onLoginClicked(email, password);
//         this.authForm.reset();
//       }
//     } else {
//       if (this.registerForm.valid) {
//         const name = this.registerForm.value.name;
//         const email = this.registerForm.value.email;
//         const password = this.registerForm.value.password;
//         this.onRegisterClicked(name, email, password);
//         this.registerForm.reset();
//       }
//     }
//   }

//   onLoginClicked(email: string, password: string) {
//     this.authService.logIn(email, password).subscribe(user => {
//       if (user) {
//         alert(`Welcome ${user.name}, You are Logged In!!!`);
//         this.router.navigate(['/all-events']);
//       } else {
//         alert('Invalid Login Credentials !!!');
//       }
//     });
//   }

//   onRegisterClicked(name: string, email: string, password: string) {
//     const newUser: User = {
//       name, email, password,
//       id: '',
//       regEvents: []
//     };
//     this.authService.registerUser(newUser).subscribe(user => {
//       if (user) {
//         alert(`Welcome ${user.name}, You have successfully registered!`);
//         this.router.navigate(['/all-events']);
//       } else {
//         alert('Registration Failed. User Already Exists !!!');
//       }
//     });
//   }
// }
