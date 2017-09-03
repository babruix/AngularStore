import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GlobalService {
  public user = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
  public order = new BehaviorSubject({});

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
  }
}
