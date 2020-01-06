import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [ RegisterComponent ]
})
export class MemberModule { }
