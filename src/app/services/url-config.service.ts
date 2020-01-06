import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {

  serverConfig = true;
    private mockHost = 'http://localhost:4200/';
    private apiHost = 'http://localhost:3000/';
    private url = {};
    urlMock() {
        return this.url = {
          userLogin: this.mockHost + './mockdata.json',
          userList: this.mockHost + './mockdata.json',
          companyList: this.mockHost + './mockdata.json',
          userGroup: this.mockHost + './mockdata.json',
          message: this.mockHost + './mockdata.json'

        };
    }
    urlApi() {
        return this.url = {
          userLogin: this.apiHost + 'user',
          userList: this.apiHost + 'user',
          companyList: this.apiHost + 'groups',
          userGroup: this.apiHost + 'userGroups',
          message: this.apiHost + 'groupMessage'

        };
    }
    urlConfig() {
        return this.serverConfig ? this.urlApi() : this.urlMock();
    }
}
