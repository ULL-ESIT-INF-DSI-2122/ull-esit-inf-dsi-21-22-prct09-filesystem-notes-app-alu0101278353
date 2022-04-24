import 'mocha';
import {expect} from 'chai';
import {User} from '../src/class/User';
import {Note} from '../src/class/Note';
import {ListUsers} from '../src/class/listUsers';


describe('Clase "ListUsers"', () => {
  const elvis = new User('elvis');
  const fer = new User('fer');
  const nota1 = new Note('Tema1', 'Funciones', 'red');
  const nota2 = new Note('Tema2', 'Interfaces', 'green');
  elvis.setNote(nota1);
  fer.setNote(nota2);
  fer.setNote(nota1);
  const listUsers = new ListUsers();
  it('Agrega usario "Fer" a la lista', () => {
    listUsers.addUser(fer);
    expect(listUsers.getList()).to.be.eql([fer]);
  });
  it('Agrega otro usuario a la lista', () => {
    listUsers.addUser(elvis);
    expect(listUsers.getList()).to.be.eql([fer, elvis]);
  });
  it('Usuario "fer" está en la lista', () => {
    expect(listUsers.userExist(fer.getName())).to.be.equal(true);  
  });
  it('Elimina una nota al usuario "elvis"', () => {
    listUsers.removeNoteUser(elvis.getName(), nota1.getTitle());
    expect(listUsers.getListNotesFromUser(elvis.getName())).to.be.eql([]);
  });
});