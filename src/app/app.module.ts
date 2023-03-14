import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'bootstrap'

import { CatalogueModule } from './front/catalogue/catalogue.module';
import { ExploreCategoriesComponent } from './front/catalogue/explore-categories/explore-categories.component';
import { FeaturedProductComponent } from './front/catalogue/featured-product/featured-product.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/types/shared';
import { SliderComponent } from './slider/slider.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CatalogueModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
