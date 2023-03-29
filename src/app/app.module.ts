import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { CatalogueModule } from './modules/catalogue/catalogue.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './layout/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app//shared/services/cart.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { CartModule } from './modules/cart/cart.module';
import { UserModule } from './modules/user/user.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ExploreCategoriesComponent } from './shared/components/explore-categories/explore-categories.component';
import { FeaturedProductComponent } from './shared/components/featured-product/featured-product.component';
import { TrendingItemsComponent } from './layout/trending-items/trending-items.component';
import { GoodThingsComponent } from './layout/good-things/good-things.component';
import { AuthService } from './shared/services/auth.service';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SliderComponent,
        ExploreCategoriesComponent,
        FeaturedProductComponent,
        TrendingItemsComponent,
        GoodThingsComponent,
    ],
    providers: [CartService, GroceriesService,AuthService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        CatalogueModule,
        FormsModule,
        HttpClientModule,
        CartModule,
        UserModule,
        IvyCarouselModule
    ]
})
export class AppModule { }
