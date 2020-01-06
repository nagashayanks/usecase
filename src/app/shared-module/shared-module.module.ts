import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SpinnerComponent],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    
  ],
  exports: [ HeaderComponent, FooterComponent, SpinnerComponent ]
})
export class SharedModuleModule { }
