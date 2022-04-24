"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
        this.list = [];
    }
    setName(newName) {
        this.name = newName;
    }
    getName() {
        return this.name;
    }
    setNote(note) {
        this.list.push(note);
    }
    removeNote(titleNota) {
        this.list = this.list.filter((n) => n.getTitle() !== titleNota);
    }
    getNotes() {
        return this.list;
    }
    searchNote(title) {
        let value = true;
        if (this.list.find((n) => n.getTitle() === title)) {
            value;
        }
        else {
            value = false;
        }
        return value;
    }
}
exports.User = User;
// let users: User[] = [];
// let user = new User('elvis');
// let user2 = new User('fer');
// let nota1 = new Note('puchi', 'asdhflña0', 'lsls');
// let nota2= new Note('cora', 'asdhflña0', 'lsls');
// user.setNote(nota1);
// user.setNote(nota2);
// user2.setNote(nota1);
// user.removeNote('puchi');
// users.push(user);
// users.push(user2);
// for (let i = 0; i < users.length; i++) {
//   let us = users[i].printNotesUser();
//   console.log(us);
// }
//# sourceMappingURL=User.js.map