import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutesModule } from './app.routes.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './core/components/main-page.component';
import { TarefaDetailComponent } from './core/components/tarefa-detail.component';
import { TarefaService } from './core/services/tarefa.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TarefaDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutesModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [TarefaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
