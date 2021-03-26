import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateJarComponent } from './create-jar/create-jar.component';
import { OpenJarComponent } from './open-jar/open-jar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './create-jar/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';



const MatModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule
]

@NgModule({
  declarations: [
    AppComponent,
    CreateJarComponent,
    OpenJarComponent,
    CardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModules,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
