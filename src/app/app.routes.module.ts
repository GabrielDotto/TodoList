import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { MainPageComponent } from './core/components/main-page.component';
import { TarefaDetailComponent } from './core/components/tarefa-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/mainPage', pathMatch: 'full'},
    { path: 'mainPage', component: MainPageComponent},
    { path: 'tarefa', component: TarefaDetailComponent},
    { path: 'tarefa/:id', component: TarefaDetailComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutesModule {  }