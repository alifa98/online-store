import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/main/login/login.component';
import { SiteInputComponent } from './components/site-input/site-input.component';
import { YellowButtonComponent } from './components/yellow-button/yellow-button.component';
import { SignupComponent } from './components/main/signup/signup.component';
import { SiteTextareaComponent } from './components/site-textarea/site-textarea.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { TabComponent } from './components/tab/tab.component';
import { InnerTabComponent } from './components/tab/inner-tab/inner-tab.component';
import { TableComponent } from './components/table/table.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteInputComponent,
    YellowButtonComponent,
    SignupComponent,
    SiteTextareaComponent,
    ProfileComponent,
    TabComponent,
    InnerTabComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
