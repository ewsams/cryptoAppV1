import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './decentral/front-end-authentication/home/home.component';
import { LandAvailableComponent } from './decentral/front-end-authentication/land-available/land-available.component';
import { JoinComponent } from './decentral/front-end-authentication/join/join.component';
import { WearablesComponent } from './decentral/front-end-authentication/wearables/wearables.component';
import { SidenavComponent } from './decentral/front-end-authentication/sidenav/sidenav.component';
import { LandSelectedComponent } from './decentral/front-end-authentication/land-selected/land-selected.component';
import { WearableSelectedComponent } from './decentral/front-end-authentication/wearable-selected/wearable-selected.component';
import { PricingTableComponent } from './crypto-pricing/pricing-table/pricing-table.component';
// tslint:disable-next-line:max-line-length
import {ProfileComponent} from './decentral/front-end-authentication/profile/profile.component';
import {ProfileDetailsComponent} from './decentral/front-end-authentication/profile-details/profile-details.component';
import { HomeLoggedInComponent } from './decentral/front-end-authentication/home-logged-in/home-logged-in.component';
import { CommentFormComponent } from './decentral/front-end-authentication/comment-form/comment-form.component';
import { CommentsComponent } from './decentral/front-end-authentication/comments/comments.component';
import { UserProfileComponent } from './decentral/front-end-authentication/user-profile/user-profile.component';
import { AuthGuard } from './decentral/front-end-authentication/services/auth.guard';
import { BodyToggleComponent } from './decentral/front-end-authentication/body-toggle/body-toggle.component';
import { EmailLoginComponent } from './decentral/front-end-authentication/email-login/email-login.component';
import {SetUpComponent} from './decentral/front-end-authentication/set-up/set-up.component';
import { CountDownComponent } from './crypto-pricing/countdown/countdown.component';
import { LoterryComponent } from './decentral/front-end-authentication/loterry/loterry.component';
import { NftMarketComponent } from './decentral/front-end-authentication/nft-market/nft-market.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home-logged-in', component: HomeLoggedInComponent,canActivate:[AuthGuard] },
  { path: 'lottery', component: LoterryComponent,canActivate:[AuthGuard]},
  {path:'nft-market',component:NftMarketComponent,canActivate:[AuthGuard]},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LandAvailableComponent,
  WearablesComponent,
  HomeComponent,
  JoinComponent,
  LandSelectedComponent,
  WearableSelectedComponent,
  PricingTableComponent,
  SidenavComponent,
  ProfileComponent,
  ProfileDetailsComponent,
  HomeLoggedInComponent,
  CommentFormComponent,
  CommentsComponent,
  UserProfileComponent,
  BodyToggleComponent,
  EmailLoginComponent,
  SetUpComponent,
  CountDownComponent,
  LoterryComponent,
  NftMarketComponent
];
