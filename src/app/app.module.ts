import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateJarComponent } from './create-jar/create-jar.component';
import { OpenJarComponent } from './open-jar/open-jar.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateJarComponent,
    OpenJarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
