import { Injectable } from  '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tarefa } from '../models/tarefa';


@Injectable()

export class TarefaService {
    
    private headers = new Headers({'Content-Type': 'application/json'});    
    private tarefaUrl = 'api/tarefas';


    constructor(private http : Http) {}

    getTarefas(): Promise<Tarefa[]>{
        return this.http.get(this.tarefaUrl)
            .toPromise()
            .then(response => response.json().data as Tarefa[])
            .catch(this.handleError);
    }

    getTarefa(id: number): Promise<Tarefa> {
        const url = `${this.tarefaUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Tarefa)
            .catch(this.handleError);
    }

    update(tarefa : Tarefa): Promise<Tarefa>{
        const url = `${this.tarefaUrl}/${tarefa.id}`;
        return this.http
                .put(url, JSON.stringify(tarefa), {headers: this.headers})
                .toPromise()
                .then(() => tarefa)
                .catch(this.handleError);
    }

    create(titulo : string): Promise<Tarefa>{
        return this.http
            .post(this.tarefaUrl, JSON.stringify({titulo: titulo}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as Tarefa)
            .catch(this.handleError);
    }

    delete(id : number): Promise<void> {
        const url = `${this.tarefaUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.error('Rolou treta', error);
        return Promise.reject(error.mensage || error);
    }

}