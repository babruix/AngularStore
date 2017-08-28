import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-new-user-input',
  template: `    
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h1>Add a User</h1>
        </div>
        <ngb-alert *ngIf="successMessage" type="success"
                   (close)="hideMessage()">
          {{ successMessage }}
        </ngb-alert>
        <div class="card-block">
          <input placeholder="Email" class="form-control" type="email" [(ngModel)]="email" required>
        </div>

        <button class="btn btn-primary" (click)="addUser(email)">Add User</button>
      </div>
    </div>
  `,
  styles: [`    

  `]
})
export class NewUserInputComponent implements OnInit {

  email: string;

  private success = new Subject<string>();
  successMessage: string;

  constructor(public db: AngularFireDatabase
  , fb: FormBuilder
  , private cardElement: ElementRef
  , private animator: AnimateDirective) {}

  addUser(email: string) {
    if (email) {

      this.db.object('/users/' + this.hashCode(email)).set({
        email: email,
        active: false
      });

      this.email = null;

      this.showSuccessMessage();
    }
  }


  ngOnInit() {

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.animator
          .slideDownIn(this.cardElement.nativeElement.querySelector('.alert')), 1);
      });

    debounceTime.call(this.success, 3000)
      .subscribe(() => this.hideMessage());

    this.animator.animationIn(this.cardElement);
  }

  public showSuccessMessage() {
    this.success
      .next(`New user was successfully created.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.cardElement.nativeElement.querySelector('.alert')
        , () => this.successMessage = '');
  }

  hashCode(input: string) {
    let hash = 0, i, chr;
    if (input.length === 0) {
      return hash;
    }
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

}
