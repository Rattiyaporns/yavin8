import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './share/share.module';
import { UniversalInterceptor } from './http-interceptors/universal-interceptor';
import { AccountRoutingModule } from './account/account-routing.module';
import { GroupRoutingModule } from './group/group-routing.module';
import { PostRoutingModule } from './post/post-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { PageRoutingModule } from './page/page-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountModule } from './account/account.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { PageModule } from './page/page.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    AccountRoutingModule,
    AccountModule,
    GroupRoutingModule,
    GroupModule,
    PostRoutingModule,
    PostModule,
    UserRoutingModule,
    UserModule,
    PageRoutingModule,
    PageModule,
    DashboardRoutingModule, 
    DashboardModule,
    ReactiveFormsModule
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
