import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/main/login/login.component';
import { SiteInputComponent } from './components/site-input/site-input.component';
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
import { HeroHeaderComponent } from './components/main/home/hero-header/hero-header.component';
import { SortBoxComponent } from './components/main/home/products/sort-box/sort-box.component';
import { ProductBoxComponent } from './components/main/home/products/product-box/product-box.component';
import { PriceFilterBoxComponent } from './components/main/home/products/price-filter-box/price-filter-box.component';
import { CategoryBoxComponent } from './components/main/home/products/category-box/category-box.component';
import { ProductsBodyComponent } from './components/main/home/products-body/products-body.component';
import { BtnComponent } from './components/btn/btn.component';
import { TomanPipe } from './pipes/toman.pipe';
import { CheckboxItemComponent } from './components/main/checkbox-item/checkbox-item.component';
import { AdminPanelComponent } from './components/main/admin-panel/admin-panel.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminPanelComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteInputComponent,
    SignupComponent,
    SiteTextareaComponent,
    ProfileComponent,
    TabComponent,
    InnerTabComponent,
    TableComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroHeaderComponent,
    SortBoxComponent,
    ProductBoxComponent,
    PriceFilterBoxComponent,
    CategoryBoxComponent,
    ProductsBodyComponent,
    BtnComponent,
    TomanPipe,
    CheckboxItemComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
