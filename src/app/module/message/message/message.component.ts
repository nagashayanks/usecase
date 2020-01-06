import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/services/call.service';
import { UrlConfigService } from 'src/app/services/url-config.service';
import { Router } from '@angular/router';
import { company, userGroup } from 'src/app/models/datamodel';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  /**
   * Creating variables
   * * @var :messagelist,property,messageData,currentUser,propComment and  commentlist
   */
  messagelist: [];
  property: userGroup;
  messageData: string;
  currentUser: string;
  propComment: string;
  commentlist: [];
  constructor(private api: CallService,
              private url: UrlConfigService,
              private service: CallService,
              private router: Router) {
               }

  ngOnInit() {
  /**
   * Calling getGroupMessagelist method to get the messages.
   */
    this.getGroupMessagelist();
  /**
   * Calling getCurrentUser method to get the existing user.
   */
    this.getCurrentUser();

  }

  /**
   * calling group messages from the user Group
   */
  getGroupMessagelist() {
    this.api.getList(this.url.urlConfig().userGroup).subscribe(res => {
      console.log('res', res);
      this.messagelist = res;
      this.property = res[0];
      this.getCommentList();
       });
  }

  /**
   * creating a method to get the existing user
   */
  private getCurrentUser() {
    // tslint:disable-next-line: no-shadowed-variable
    const user =  JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = user;
   }

  /**
   * creating a method to Send the message.
   */
  sendData(Data) {
    const data = {
      message : this.messageData,
      userName : this.currentUser,
      groupId : this.property.groupId
    };
    this.apiAction(this.url.urlConfig().message, data, 'post');
    this.messageData = '';

  }
/**
 * Calling httpostRequest method of data service to post our join group details
 * @param:url,data,method
 */
  private apiAction(url: string, data, method: string): void {
    this.service.postCall(url, data, method).subscribe(res => {
      this.getCommentList();
    });
  }
  /**
   * creating a method to fetch the messages.
   */
  getCommentList() {
    const url = '?groupId=' + this.property.groupId;
    this.api.getList(this.url.urlConfig().message.concat(url)).subscribe(res => {
      console.log('res', res);
      this.commentlist = res;
      this.propComment = res;
       });
  }
  /**
   * creating a method to display the messages basis on selecting the company.
   */
  selectedlist(data) {
    this.property = data ;
    this.getCommentList();

  }
  /**
   * creating a method for navigate to home page.
   */
  back() {
    this.router.navigateByUrl('/home');
  }
}
