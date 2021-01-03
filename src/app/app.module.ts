import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloBoostModule, ApolloBoost } from "apollo-angular-boost";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";

//Local imports
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FrontEndAuthenticationComponent } from "./front-end-authentication/front-end-authentication.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { environment } from "../environments/environment.prod";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    routingComponents,
    FrontEndAuthenticationComponent,
    NavbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloBoostModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, "ewsdeploy"),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(boost: ApolloBoost) {
    boost.create({
      uri: "https://api.thegraph.com/subgraphs/name/decentraland/marketplace",
      // Don't forget that you can actually pass http Headers
      // directly here with the option "httpOptions"
    });
  }
}
