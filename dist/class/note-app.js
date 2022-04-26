"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yargs = require("yargs");
const User_1 = require("./User");
const Note_1 = require("./Note");
/**
 * Path para guardar las notas
 */
const pathFile = '/home/usuario/p9/src/Notes/';
/**
 * lista de usuarios
 */
let users = [];
/**
 * Lee los usuarios y sus notas para crear la lista de usuarios
 */
const setUsers = () => {
    const file = fs.readdirSync(pathFile);
    file.map((user) => {
        const newUser = new User_1.User(user);
        const notes = fs.readdirSync(pathFile + user);
        notes.map((note) => {
            const newNote = fs.readFileSync(pathFile + user + '/' + note, { encoding: 'utf8', flag: 'r' });
            newUser.setNote(JSON.parse(newNote));
        });
        users = [...users, newUser];
        // console.log(users);
    });
};
/**
 * Agrega una nota
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body from the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color from the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            const note = new Note_1.Note(argv.title, argv.body, argv.color);
            const newUsu = new User_1.User(argv.user);
            let dir = `${pathFile}${argv.user}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
                newUsu.setNote(note);
                users = [...users, newUsu];
                console.log('Nota agregada');
            }
            else {
                if (!fs.existsSync(`${dir}/${argv.title}.json`)) {
                    fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
                    newUsu.setNote(note);
                    console.log('Nota agregada');
                }
                else {
                    console.log('Tienes una nota con ese nombre');
                }
            }
        }
    },
});
// /**
//  * Elimina nota de la lista
//  */
yargs.command({
    command: 'remove',
    describe: 'Delete a note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.title === 'string' && typeof argv.user === 'string') {
            // let usuario = users.find((user) => user.getName() === argv.user);
            let thisUser = users.find((user) => user.getName() === argv.user);
            let title = argv.title;
            if (!users.find((user) => user.getName() === argv.user)) {
                let dir = `${pathFile}${argv.user}`;
                if (fs.existsSync(`${dir}/${argv.title}.json`)) {
                    fs.unlinkSync(`${dir}/${argv.title}.json`);
                    // users.forEach((user) => {
                    //   if (user.getName() === argv.user) {
                    //     if (user.searchNote(title)) {
                    //       user.removeNote(title);
                    //     }
                    //   }
                    // });
                    if (thisUser !== undefined) {
                        if (thisUser.searchNote(title)) {
                            thisUser.removeNote(title);
                        }
                        console.log('nota eliminada');
                    }
                }
                else {
                    console.log('Nombre de nota incorrecto');
                }
            }
            else {
                console.log('nombre de usuario incorrecto');
            }
        }
    },
});
/**
 * Lista las nota que tiene el usuario
 */
yargs.command({
    command: 'list',
    describe: 'List a note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            setUsers();
            let notes = [];
            if (users.find((user) => user.getName() === argv.user)) {
                let thisUser = users.find((user) => user.getName() === argv.user);
                if (thisUser !== undefined) {
                    notes = thisUser.getNotes();
                    notes.forEach((note) => {
                        let values = Object.values(note).at(0);
                        console.log(values);
                    });
                }
            }
            else {
                console.log('nombre de usuario incorrecto');
            }
        }
    },
});
yargs.parse();
//# sourceMappingURL=note-app.js.map