import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { ApiExclusionService } from './servicios/api-exclusion.service';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExclusionComponent } from './exclusion/exclusion.component';

import { InclusionComponent } from './inclusion/inclusion.component';
import { FiltroexclComponent } from './filtroexcl/filtroexcl.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ExclusionComponent,
    InclusionComponent,
    FiltroexclComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiExclusionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
