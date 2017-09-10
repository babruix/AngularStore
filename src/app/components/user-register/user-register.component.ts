import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  template: `
    <ngb-alert *ngIf="error" type="warning" role="alert">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span class="sr-only">Error:</span>
      {{ error }}
    </ngb-alert>

    <div class="modal-dialog">
      <div class="registermodal-container">
        <h1>Register</h1><br>

        <form class="form-signin" (submit)="register($event, name.value, email.value, password.value)">
          <label for="name" class="sr-only">Name</label>
          <input #name type="text" id="name" class="form-control" placeholder="Name" required="">
          <label for="email" class="sr-only">Email address</label>
          <input #email type="email" id="email" class="form-control" placeholder="Email address" required="" autofocus="">
          <label for="inputPassword" class="sr-only">Password</label>
          <input #password type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
          <br>
          <button  class="btn btn-md btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .registermodal-container {
      padding: 30px;
      max-width: 350px;
      width: 100% !important;
      background-color: #F7F7F7;
      margin: 0 auto;
      border-radius: 2px;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      font-family: roboto;
    }

    .registermodal-container h1 {
      text-align: center;
      font-size: 1.8em;
      font-family: roboto;
    }
  `]
})
export class UserRegisterComponent {

  public error: any;

  constructor(public afAuth: AngularFireAuth
              , public af: AngularFireDatabase
              , private router: Router) { }

  registerUser(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  saveUserInfoFromForm(uid, name, email) {
    return this.af.object('users/' + uid).set({
      name: name,
      email: email,
    });
  }

  register(event, name, email, password) {
    event.preventDefault();
    this.registerUser(email, password).then((user) => {
      this.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
      });
  }
}
