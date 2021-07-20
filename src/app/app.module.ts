import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareModule } from './share/share.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UniversalInterceptor } from './http-interceptors/universal-interceptor';
import { LoginComponent } from './account/login/login.component';
import { AccountRoutingModule } from './account/account-routing.module';
import { GroupRoutingModule } from './group/group-routing.module';
import { PostRoutingModule } from './post/post-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { PageRoutingModule } from './page/page-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    GroupRoutingModule,
    PostRoutingModule,
    UserRoutingModule,
    PageRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
