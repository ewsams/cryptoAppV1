import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloBoostModule } from 'apollo-angular-boost';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserPricingService } from './services/user-pricing.service';
import { routingComponents } from '../app-routing.module';
import { TableSearchPipe } from './services/table-search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [routingComponents, TableSearchPipe],
  imports: [
    CommonModule,
    BrowserModule,
    ApolloBoostModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule
  ],
  providers: [UserPricingService],
  exports: [routingComponents],
})
export class CryptoPricingModule {}
