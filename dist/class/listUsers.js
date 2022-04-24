"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsers = void 0;
class ListUsers {
    constructor() {
        this.listUsers = [];
    }
    addUser(user) {
        this.listUsers.push(user);
    }
    userExist(usu) {
        let value = true;
        if (this.listUsers.find((user) => user.getName() === usu)) {
            value;
        }
        else {
            value = false;
        }
        return value;
    }
    removeNoteUser(usu, title) {
        if (this.userExist(usu)) {
            this.listUsers.forEach((user) => {
                if (user.getName() === usu) {
                    user.removeNote(title);
                }
            });
        }
    }
    getList() {
        return this.listUsers;
    }
}
exports.ListUsers = ListUsers;
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
//# sourceMappingURL=listUsers.js.map