import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RequestService } from './request.service';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './helpers';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MaterialModule,
      HttpClientModule,
      HomeModule,
      ToastrModule.forRoot({
         timeOut: 10000,
         preventDuplicates: true
      }),
      AppRoutingModule
     ],
     providers: [
       RequestService,
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
     ],
     bootstrap: [AppComponent],
     entryComponents: [],
})
export class AppModule { }
