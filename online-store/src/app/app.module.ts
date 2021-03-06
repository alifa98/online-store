import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

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
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/main/pagination/pagination.component';
import { AddProductComponent } from './components/main/add-product/add-product.component';
import { SiteInputChoiceComponent } from './components/site-input-choice/site-input-choice.component';
import { SupportComponent } from './components/main/support/support.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { ActionModalComponent } from './components/action-modal/action-modal.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'support', component: SupportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/add_product', component: AddProductComponent },
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
    AdminPanelComponent,
    ModalComponent,
    PaginationComponent,
    AddProductComponent,
    SiteInputChoiceComponent,
    SupportComponent,
    ContactComponent,
    ActionModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
