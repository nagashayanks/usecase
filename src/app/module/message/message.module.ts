import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message/message.component';
import {ListboxModule} from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    ListboxModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    TableModule
  ],
  exports: [ MessageComponent, ListboxModule ]

})
export class MessageModule { }
