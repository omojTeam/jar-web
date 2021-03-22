import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateJarComponent } from './create-jar/create-jar.component';
import { OpenJarComponent } from './open-jar/open-jar.component';

const routes: Routes = [
  {path: '', component: CreateJarComponent},
  {path: 'jar', component: OpenJarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
