import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InMemoryCache } from 'apollo-angular-boost';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// Local imports
import {MetaModule} from './meta/meta.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { CryptoPricingModule } from './crypto-pricing/crypto-pricing.module';
import {
  JoinModalComponent,
  NgbdModalContentComponent,
} from './decentral/front-end-authentication/join-modal/join-modal.component';
import { MobileModalComponent } from './decentral/front-end-authentication/mobile-modal/mobile-modal.component';
import { AboutUsModalComponent } from './decentral/front-end-authentication/about-us-modal/about-us-modal.component';

// Services
import { Web3Service } from './util/web3.service';
import {FirestoreService} from './decentral/front-end-authentication/services/firestore.service';
import { AuthService } from './decentral/front-end-authentication/services/auth.service';
import { CommentsService } from './decentral/front-end-authentication/services/comments.service';
import { UserService } from './decentral/front-end-authentication/services/user.service';
import { SetUpComponent } from './decentral/front-end-authentication/set-up/set-up.component';
import { NavbarComponent } from './decentral/front-end-authentication/navbar/navbar.component';
import { WorkingComponent } from './decentral/front-end-authentication/working/working.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalContentComponent,
    JoinModalComponent,
    MobileModalComponent,
    AboutUsModalComponent,
    NavbarComponent,
    WorkingComponent,
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
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule
  ],
  entryComponents: [NgbdModalContentComponent, MobileModalComponent, AboutUsModalComponent, SetUpComponent,WorkingComponent],
  providers: [UserService, CommentsService,
    FirestoreService, AuthService,Web3Service],
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

