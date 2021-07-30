import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    PrivacyComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,    
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [    
    LoginComponent,
    PrivacyComponent,
    TermsComponent
  ]
})
export class AccountModule { }
