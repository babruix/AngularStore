import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
          <label *ngIf="isEditing" for="active">Active?
            <input name="active" class="form-control" type="checkbox" [(ngModel)]="active" required>
          </label>
          <select [(ngModel)]="role" *ngIf="isEditing" class="form-control" name="role">
            <option [(ngModel)]="role" value="admin">Admin</option>
            <option [(ngModel)]="role" value="manager">Manager</option>
            <option [(ngModel)]="role" value="user">User</option>
          </select>
        </div>

        <button class="btn btn-primary" (click)="addUser(email, active, role)">
          {{ isEditing ? 'Edit': 'Add'}} 
          User</button>
      </div>
    </div>
  `,
  styles: [`    

  `]
})
export class NewUserInputComponent implements OnInit {

  private success = new Subject<string>();
  successMessage: string;

  isEditing: boolean;
  currentUser: FirebaseObjectObservable<any>;
  userKey: string;
  email: string;
  active: string;
  role: string;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const enterKey = event.keyCode ? event.keyCode : event.which;
    if (enterKey === 13) {
      this.addUser(this.email, this.active, this.role);
    }
  }

  constructor(public db: AngularFireDatabase
              , private cardElement: ElementRef
              , private animator: AnimateDirective
              , public route: ActivatedRoute
              , public router: Router) {}

  addUser(email: string, active: string, role: string) {
    if (!email) {
      return;
    }

    if (this.isEditing && this.userKey) {
      this.currentUser = this.db.object('/users/' + this.userKey);
      this.currentUser.update({
        email: email,
        active: active || false,
        role: role || 'user'
      });
    } else {
      this.db.object('/users/' + this.hashCode(email)).set({
        email: email,
        active: false,
        role: 'user'
      });
    }

    this.email = null;

    this.showSuccessMessage();
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

    this.route.params.subscribe((params: Params) => {
      if (params && params.key) {
        this.isEditing = true;
        this.userKey = params.key;
        this.currentUser = this.db
          .object('/users/' + params.key);

        this.currentUser.subscribe(u => {
          this.email = u.email;
          this.active = u.active;
          this.role = u.role;
        });

      } else {
        this.email = null;
        this.active = null;
        this.role = null;
      }
    });
  }

  public showSuccessMessage() {
    this.success
      .next(`User was successfully saved.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.cardElement.nativeElement.querySelector('.alert')
        , () => {
        this.successMessage = '';
          if (this.isEditing) {
            this.router.navigateByUrl('admin/users');
          }
      });
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
