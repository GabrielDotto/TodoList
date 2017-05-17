import { Component, OnInit } from '@angular/core';

import { Tarefa } from '../models/tarefa';
import { TarefaService } from '../services/tarefa.service';

@Component({
    selector: 'mainPage',
    template: `
              <div class="main-pagina"> 
                  <div class="header-pagina">
                      <h1> Tarefas </h1>
                      <nav>
                        <div>
                          <a id="btn-titulo" routerLink="/tarefa" routerLinkActive="active"> Adicionar Tarefa </a>
                        </div>
                      </nav>
                      <div class="separator"></div>
                  </div>  
                  <div class="body-pagina">
                    <ul>
                      <li *ngFor="let tarefa of tarefas" on-mouseenter="showBtns(tarefa)" on-mouseleave="hideBtns(tarefa)"> 
                        <div class="tarefas">
                        <i class="material-icons" id="done" *ngIf="tarefa.dataConclusao != null">done</i> 
                          <h3 [routerLink]="['/tarefa', tarefa.id]">
                               {{tarefa.titulo}}
                          </h3>
                          <div class="edit-botoes" *ngIf="tarefa.isFocus">
                            <span id="btn" >  
                              <i class="material-icons" (click)="delete(tarefa)"> delete </i> 
                              <i class="material-icons" [routerLink]="['/tarefa', tarefa.id]"> create </i> 
                             </span>
                          </div>
                        </div>  
                      </li>
                    </ul>
                  </div>   
              </div>
              `,
    styleUrls: ['../assets/style/main-page.component.less']
})

export class MainPageComponent  {

  tarefas: Tarefa[] = [];

    
  
    constructor(private tarefaService: TarefaService) { }

    ngOnInit(): void {
        this.tarefaService.getTarefas()
          .then(tarefas => this.tarefas = tarefas) ;
    }

    showBtns(tarefa : Tarefa): void {
      tarefa.isFocus = !tarefa.isFocus; 
    }

    hideBtns(tarefa : Tarefa) : void {
      tarefa.isFocus = !tarefa.isFocus; 
    }

    delete(tarefa : Tarefa): void   {
      this.tarefaService
      .delete(tarefa.id)
      .then(() => {
        this.tarefas = this.tarefas.filter(h => h !== tarefa);
      })
    }
}