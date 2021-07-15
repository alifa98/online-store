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
import { HeaderComponent } from './components/main/header/header.component';
import { HomeComponent } from './components/main/home/home.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
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
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
