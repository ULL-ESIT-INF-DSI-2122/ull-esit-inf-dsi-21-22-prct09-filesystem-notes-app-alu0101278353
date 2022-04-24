import * as fs from 'fs';
import * as yargs from 'yargs';
import { User } from './User';
import { Note } from './Note';

/**
 * Path para guardar las notas
 */
const pathFile: string = '/home/usuario/p9/src/notesUser/'; 
/**
 * lista de usuarios
 */
let users: User[] = [];
/**
 * Lee los usuarios y sus notas para crear la lista de usuarios
 */
const setUsers = () => {
  const file = fs.readdirSync(pathFile);
  file.map((user) => {
    const newUser = new User(user);
    const notes = fs.readdirSync(pathFile+user);
    notes.map((note) => {
      const newNote = fs.readFileSync(pathFile+user+'/'+note, {encoding: 'utf8', flag: 'r'});
      newUser.setNote(JSON.parse(newNote));
    });
    users = [...users, newUser];
  });
};
setUsers();
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
      const note = new Note(argv.title, argv.body, argv.color);
      const newUsu = new User(argv.user);
      let dir = `${pathFile}${argv.user}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
        newUsu.setNote(note);
        users = [...users, newUsu];
        console.log('Nota agregada');
      } else {
        if (!fs.existsSync(`${dir}/${argv.title}.json`)) {
          fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
          newUsu.setNote(note);
          console.log('Nota agregada');
        } else {
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
      let title: string = argv.title;
      if (users.find((user) => user.getName() === argv.user)) {
        let dir = `${pathFile}${argv.user}`;
        if (fs.existsSync(`${dir}/${argv.title}.json`)) {
          fs.unlinkSync(`${dir}/${argv.title}.json`);
          users.forEach((user) => {
            if (user.getName() === argv.user) {
              if (user.searchNote(title)) {
                user.removeNote(title);
              }
            }
          });
          console.log('nota eliminada');
        } else {
          console.log('Nombre de nota incorrecto');
        }
      } else {
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
    if (typeof argv.title === 'string') {
      let notes: Note[] = [];
      if (users.find((user) => user.getName() === argv.user)) {
        users.map((user) => {
          notes = user.getNotes();
          notes.forEach((note) => {
            console.log(note.getTitle());
          });
        });
      }
    }
  },
});
yargs.parse();