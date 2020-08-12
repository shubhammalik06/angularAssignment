import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './components/form/form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { httpInterceptProviders } from './http-interceptors';

// Form 
import { FormService } from './shared/form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Design
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

import { AgePipe } from './shared/age.pipe';

import { peopleGuardService } from './shared/people-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PageNotFoundComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [FormService, httpInterceptProviders, peopleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
