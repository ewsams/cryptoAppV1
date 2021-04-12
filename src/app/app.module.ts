import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

// Local imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { UserService } from './decentral/front-end-authentication/services/user.service';
import { CryptoPricingModule } from './crypto-pricing/crypto-pricing.module';
import { NavbarComponent } from './decentral/front-end-authentication/navbar/navbar.component';
import { InMemoryCache } from 'apollo-angular-boost';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  JoinModalComponent,
  NgbdModalContentComponent,
} from './decentral/front-end-authentication/join-modal/join-modal.component';
import { CommentsService } from './decentral/front-end-authentication/services/comments.service';
import {FirestoreService} from './decentral/front-end-authentication/services/firestore.service';
import { AuthService } from './decentral/front-end-authentication/services/auth.service';
import { ResponsiveService } from './decentral/front-end-authentication/services/responsive.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NgbdModalContentComponent,
    JoinModalComponent,
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserModule,
    CryptoPricingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ewsdeploy'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
  ],
  entryComponents: [NgbdModalContentComponent],
  providers: [UserService, CommentsService, FirestoreService, AuthService, ResponsiveService],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule, NgbModule],
})
export class AppModule {
  private readonly URI1: string =
    'https://api.thegraph.com/subgraphs/name/decentraland/marketplace';
  private readonly URI2: string =
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

  constructor(apollo: Apollo, httpLink: HttpLink) {
    const options1: any = { uri: this.URI1 };
    apollo.createNamed('DecentralLand', {
      link: httpLink.create(options1),
      cache: new InMemoryCache(),
    });

    const options2: any = { uri: this.URI2 };
    apollo.createNamed('Uniswap', {
      link: httpLink.create(options2),
      cache: new InMemoryCache(),
    });
  }
}
