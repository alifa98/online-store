import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/main/login/login.component';
import { SiteInputComponent } from './components/site-input/site-input.component';
import { YellowButtonComponent } from './components/yellow-button/yellow-button.component';
import { SignupComponent } from './components/main/signup/signup.component';
import { SiteTextareaComponent } from './components/site-textarea/site-textarea.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteInputComponent,
    YellowButtonComponent,
    SignupComponent,
    SiteTextareaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
