import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  transferCommonData: Subject<any> = new Subject<any>();

  childComponentGlobalData(message) {
    this.transferCommonData.next(message);
  }
}
