import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from 'src/app/services/call.service';
import { UrlConfigService } from 'src/app/services/url-config.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { company, user, userGroup } from 'src/app/models/datamodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * Creating variables
   * @var :companyData,filterData,UserDetails,groupData and  currentUser
   */
  companyData: company[];
  filterData: company[];
  UserDetails: user;
  groupData: userGroup[];
  currentUser: user;
  constructor(private api: CallService,
              private url: UrlConfigService,
              private router: Router,
              private confirmService: ConfirmationService,
              private messageService: MessageService,
              private service: CallService,
              public commonService: CommonService) { }

  ngOnInit() {
    /**
     * Calling getCurrentUser method to get the current user.
     */
    this.getCurrentUser();
    /**
     * Calling getUserGroupList method to get the Grouplist.
     */
    this.getUserGroupList();


  }

  childDataCallObservableWay(message) {
    /* Observable Step3: On load time call observable function with parameter */
    this.commonService.childComponentGlobalData(message);
}
  /**
   * calling all the companys available list
   */
  getCompanyList() {
    this.api.getList(this.url.urlConfig().companyList).subscribe(res => {
      console.log('res', res);
      this.filterData = res;
      this.filterGroup();

    });
  }

  /**
   * fetching joinned groups
   */
  getUserGroupList() {
    this.api.getList(this.url.urlConfig().userGroup).subscribe(res => {
      console.log('res', res);
      this.groupData = res;
      const childToParentObservableMessage = 'This is Observable Child Data';
      this.childDataCallObservableWay(childToParentObservableMessage);
      if (res) {
        this.getCompanyList();
      }
    });
  }

  /**
   * condition to join the group
   * @param:companyData
   */
  groupJoin(companyData) {
    this.confirmService.confirm({
      message: 'Are you sure that you want to Join?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key: 'tandc',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Joinned Succesfully', detail: 'succesfully joinned with Group' });
        this.joinGroup(companyData);
        this.router.navigateByUrl('/home');
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'You cancelled to join this group' });

      }
    });
  }
  /**
   * filtering the companylist after joinning to auto popup
   */
  private filterGroup() {
    const group = this.groupData;
    console.log(group, 'v');
    if (group && group.length) {
      this.companyData = this.filterData.filter(companyElement => {
        return !group.find(groupElement => {
          return groupElement.groupId === companyElement.id;
        });
      });
    }
    console.log(this.companyData);
  }

  /**
   * creating a method to join group
   * @param:companyData
   */
  private joinGroup(companyData) {
    const data = {
      userId: this.currentUser.id,
      groupName: companyData.display,
      groupId: companyData.id
    };
    console.log('data', data);
    this.apiAction(this.url.urlConfig().userGroup, data, 'post');
    this.getUserGroupList();
    // tslint:disable-next-line: only-arrow-functions
    // this.companyData = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })
  }
  /**
   * Calling httpostRequest method of data service to post our join group details
   * @param:url,data,method
   */
  private apiAction(url: string, data, method: string): void {
    this.service.postCall(url, data, method).subscribe(res => {
    });
  }

  /**
   * creating a method to get current user
   */
  private getCurrentUser() {
    // tslint:disable-next-line: no-shadowed-variable
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = user;
  }

  /**
   * Method to navigate to message page
   */
  goto() {
    this.router.navigateByUrl('/message');
  }
}
