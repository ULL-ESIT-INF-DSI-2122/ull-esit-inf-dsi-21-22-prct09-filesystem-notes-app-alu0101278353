import * as fs from 'fs';
import * as yargs from 'yargs';
import { User } from './User';
import { Note } from './Note';
import { ListUsers } from './listUsers';
// import { CollectionNotesUser } from './CollectionNotes';

const pathFile: string = '/home/usuario/p9/src/notesUser/'; 
const users = new ListUsers();
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
      users.addUser(newUsu);
    }
  },
});

/**
 * Elimina nota de la lista
 */
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
      // let user = users.find((user) => user.getName() === argv.user);
        if (users.userExist(argv.user)) {
          let dir = `${pathFile}${argv.user}`;
          if (fs.existsSync(`${dir}/${argv.title}.json`)) {
            fs.unlinkSync(`${dir}/${argv.title}.json`);
            users.removeNoteUser(argv.user, argv.title);
            console.log('nota eliminada');
          } else {
            console.log('Nombre de nota incorrecto');
          }
        } else {
          console.log('nombre de usuario incorrecto');
        }
      }
      // let dir = `${pathFile}${argv.user}`;
      // if (fs.existsSync(`${dir}/${argv.title}.json`)) {
      //   user?.removeNote(argv.title); // undefined
      //   fs.unlinkSync(`${dir}/${argv.title}.json`);
      //   console.log('nota eliminada');
    //   } else {
    //     console.log('no se puede eliminar la nota');
    //   }
    },
});

// /**
//  * Edita nota que tiene el usuario
//  */
//  yargs.command({
//   command: 'edit',
//   describe: 'Edit a note',
//   builder: {
//     user: {
//       describe: 'Name User',
//       demandOption: true,
//       type: 'string',
//     },
//     title: {
//       describe: 'Note title',
//       demandOption: true,
//       type: 'string',
//     },
//     changeBody: {
//       describe: 'Change Body',
//       demandOption: true,
//       type: 'string',
//     },
//   },
//   handler(argv) {
//     if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.changeBody === 'string') {
    
//     }
//   },
// });
yargs.parse();
console.log(users.getList());