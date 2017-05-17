import { Location }  from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { TarefaService }              from '../services/tarefa.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { Tarefa } from '../models/tarefa';

@Component({
    selector: 'tarefa',
    template: `
        <div class="tarefaDetail">
            <h2>Tarefa</h2>
            <div>
                <label>Título: </label>
                <input [(ngModel)]="tarefa.titulo" placeholder="titulo" /> <br>
                <label>Concluída </label>
                <input #concluida type="checkbox" [checked]="tarefa.dataConclusao" (change)="alterarConclusaoTarefa(concluida, tarefa)" /> 
            </div> 
            <button (click)="goBack()">Back</button>
            <button (click)="save()">Save</button>
        </div>
    `,
    styleUrls: ['../assets/style/tarefa-detail.component.css']
})

export class TarefaDetailComponent  {


    @Input() tarefa: Tarefa

    constructor(
        private tarefaService: TarefaService,
        private location: Location,
        private route: ActivatedRoute,
    
    ) {   
        this.tarefa =  new Tarefa();
     }

     ngOnInit(): void{
        this.route.params
          .filter(params => params['id'])
          .switchMap((params: Params) => this.tarefaService.getTarefa(+params['id']))
          .subscribe(tarefa => this.tarefa = tarefa);
    }

     goBack(): void {
         console.log(this.tarefa);
        this.location.back();
    }

    save(): void {
        if(this.tarefa.id != null){
             this.tarefaService.update(this.tarefa)
            .then( () => this.goBack());
        }
        else {
            this.tarefaService.create(this.tarefa.titulo)
            .then( () => this.goBack());
        }
    }

    
        alterarConclusaoTarefa(element: HTMLInputElement, tarefa: Tarefa): void{
            `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`
            if(element.checked){
                var dataAtual = new Date();
                dataAtual.getDate
                tarefa.dataConclusao = dataAtual;
            }
            else{
                tarefa.dataConclusao = null;
            }
            var consolePrint = `Tarefa ${element.checked ? '' : 'ainda não '}concluída\n`
            console.log(consolePrint);   
        }

}