import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateJarComponent, DialogSubmit } from './create-jar/create-jar.component';
import { OpenJarComponent } from './open-jar/open-jar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './create-jar/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import Lottie from 'lottie-web';

export function playerFactory() {
  return player;
}


const MatModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    CreateJarComponent,
    OpenJarComponent,
    CardComponent,
    HeaderComponent,
    DialogSubmit
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModules,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
