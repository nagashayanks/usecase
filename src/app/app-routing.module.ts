import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
  },
  {
    path: 'home',
    loadChildren: () => import(`./module/home/home.module`).then(m => m.HomeModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'message',
    loadChildren: () => import(`./module/message/message.module`).then(m => m.MessageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
