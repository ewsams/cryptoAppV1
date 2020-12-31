import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../app/home/home.component";
import { LandAvailableComponent } from "../app/land-available/land-available.component";
import { ProfileComponent } from "../app/profile/profile.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "land", component: LandAvailableComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  AppComponent,
  LandAvailableComponent,
  HomeComponent,
];
