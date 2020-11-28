import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtModule } from '@auth0/angular-jwt';

import { MaterialModule } from '@modules/material.module';

import { ComponentsModule } from '@components/components.module';

import { CustomHttpInterceptor } from '@interceptors/custom-http.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // Third party modules
    FlexLayoutModule,
    ImageCropperModule,
    NgImageSliderModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['211.75.1.201:50004'],
      },
    }),

    // Shared modules
    MaterialModule,

    // Components modules
    ComponentsModule,

    // App's modules
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
