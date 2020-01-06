import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  alertConfig = {};
 // Http Headers
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
  constructor(private http: HttpClient) { }

  postCall(url, postData, type): Observable<any> {
    this.alertConfig = {};
    return this.http[type](url, JSON.stringify(postData), this.httpOptions);
  }

  getList(url: string): Observable<any> {
    this.alertConfig = {};
    return this.http.get(url).pipe(
      retry(1),
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      /* Get client-side error */
      errorMessage = error.error.message;
    } else {
      /* Get server-side error */
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.alertConfig = this.modalConfig('Error', error.message, true);
    return throwError(errorMessage);
  }

  public modalConfig(head, mesg, modal) {
    return {
      header: head,
      message: mesg,
      modalShow: modal
    };
  }

  /* Check whether valid user or not  */
  public validUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
