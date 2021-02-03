import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './decentral/front-end-authentication/home/home.component';
import { LandAvailableComponent } from './decentral/front-end-authentication/land-available/land-available.component';
import { JoinComponent } from './decentral/front-end-authentication/join/join.component';
import { WearablesComponent } from './decentral/front-end-authentication/wearables/wearables.component';
import { SidenavComponent } from './decentral/front-end-authentication/sidenav/sidenav.component';
import { LandSelectedComponent } from './decentral/front-end-authentication/land-selected/land-selected.component';
import { WearableSelectedComponent } from './decentral/front-end-authentication/wearable-selected/wearable-selected.component';
import { PricingTableComponent } from './crypto-pricing/pricing-table/pricing-table.component';
// tslint:disable-next-line:max-line-length
import { FrontEndAuthenticationComponent } from './decentral/front-end-authentication/front-end-authentication/front-end-authentication.component';
import {ProfileComponent} from './decentral/front-end-authentication/profile/profile.component';
import {ProfileDetailsComponent} from './decentral/front-end-authentication/profile-details/profile-details.component';
import { HomeLoggedInComponent } from './decentral/front-end-authentication/home-logged-in/home-logged-in.component';
import { CommentFormComponent } from './decentral/front-end-authentication/comment-form/comment-form.component';
import { CommentsComponent } from './decentral/front-end-authentication/comments/comments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'land', component: LandAvailableComponent },
  { path: 'wearables', component: WearablesComponent },
  { path: 'land-selected/:createdAt', component: LandSelectedComponent },
  { path: 'data-table', component: PricingTableComponent },
  { path: 'home-logged-in', component: HomeLoggedInComponent},
  {
    path: 'wearable-selected/:createdAt',
    component: WearableSelectedComponent,
  },
  {path: 'profile', component: ProfileComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'profile-details', component: ProfileDetailsComponent},
  { path: '**', component: HomeComponent },
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
  FrontEndAuthenticationComponent,
  ProfileComponent,
  ProfileDetailsComponent,
  HomeLoggedInComponent,
  CommentFormComponent,
  CommentsComponent
];
