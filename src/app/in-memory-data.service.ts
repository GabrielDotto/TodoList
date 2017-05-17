import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let tarefas = [
      {id: 11, titulo: 'Comprar Livros'},
      {id: 12, titulo: 'Arrumar Casa', dataConclusao: '11/04/2017'},
      {id: 13, titulo: 'Ligar para fulano', dataConclusao: '11/04/2017'},
      {id: 14, titulo: 'blabla bla'},
      {id: 15, titulo: 'teste teste', dataConclusao: '11/04/2017'},
      {id: 16, titulo: 'Estudar Angular'},
      {id: 17, titulo: 'Estudar WebAPI'},
    ];
    return {tarefas};
  }
}