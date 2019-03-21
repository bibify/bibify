import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHandlerComponent } from './form-handler/form-handler.component';
import { CiteHandlerComponent } from './cite-handler/cite-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    FormHandlerComponent,
    CiteHandlerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
