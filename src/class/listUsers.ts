import { Note } from './Note';
import { User } from './User';

export class ListUsers {
  private listUsers: User[];
  constructor() {
    this.listUsers = [];
  }
  public addUser(user: User): void {
    this.listUsers.push(user);
  }
  /**
   * Comprueba que exista el usuario
   * @param usu usuario a buscar
   * @returns un valor boleano
   */
  public userExist(usu: string): boolean {
    let value: boolean = true;
    if (this.listUsers.find((user) => user.getName() === usu)) {
      value;
    } else {
      value = false;
    }
    return value;
  }
  public removeNoteUser(usu: string, title: string): void {
    this.listUsers.forEach((user) => {
      if (user.getName() === usu) {
        user.removeNote(title);
      }
    });
  }
  public getList(): User[] {
    return this.listUsers;
  }
  public getListNotesFromUser(user: string): Note[] {
    let notes: Note[] = [];
    this.listUsers.forEach((u) => {
      if ( u.getName() === user) {
        notes = u.getNotes();
      }
    });
    return notes;
  }
  // public printList(): string {
  //   let out: string = '';
  //   this.listUsers.forEach((user) => {
  //     out = `Usuario: ${user.getName()}, Notas: ${user.printNotesUser()}`;
  //   });
  //   return out;
  // }
}

// let user = new User('elvis');
// let user2 = new User('fer');
// let nota1 = new Note('puchi', 'asdhflña0', 'lsls');
// let nota2= new Note('cora', 'asdhflña0', 'lsls');
// user.setNote(nota1);
// user.setNote(nota2);
// user2.setNote(nota1);
// const newList = new ListUsers();
// newList.addUser(user2);
// newList.addUser(user2);
// newList.removeNoteUser(user.getName(), nota1.getTitle());
// let salida = newList;
// console.log(salida);