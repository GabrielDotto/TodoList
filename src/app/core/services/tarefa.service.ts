import { Injectable } from  '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { Tarefa } from '../models/tarefa';


@Injectable()

export class TarefaService {
    
    private headers = new Headers({'Content-Type': 'application/json'});    
    private _tarefaUrl = 'http://localhost:3295/api/todo';

    constructor(private http : Http) {}

    getTarefas() {
        return this.http.get(this._tarefaUrl)
            .map(response => <Tarefa[]>response.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    

    getTarefa(id: number) {
        const url = `${this._tarefaUrl}/${id}`;
        return this.http.get(url)
            .map(response => <Tarefa>response.json())
            .catch(this.handleError);
    }

    update(tarefa : Tarefa) {
        const url = `${this._tarefaUrl}/${tarefa.id}`;
        return this.http
                .put(url, JSON.stringify(tarefa), {headers: this.headers})    
                .map(() => tarefa)
                .catch(this.handleError);
    }

    create(tarefa : Tarefa) {
        return this.http
            .post(this._tarefaUrl, tarefa, {headers: this.headers})
            .map(response => <Tarefa>response.json())
            .catch(this.handleError);
    }

    delete(id : number) {
        const url = `${this._tarefaUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.error('Rolou treta', error);
        return Promise.reject(error.mensage || error);
    }

}