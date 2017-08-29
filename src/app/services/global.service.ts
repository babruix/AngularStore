import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GlobalService {
  public user = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
  public order = new BehaviorSubject({});
}
