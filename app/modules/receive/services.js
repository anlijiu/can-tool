import { Observable } from 'rxjs/Observable';
const { ipcRenderer } = require('electron')

export const acquireReceivedService = () => Observable.create((observer) => {
  ipcRenderer.on('replay:acquire:received', (event, arg) => {
    observer.next(arg);
    observer.complete();
  });
  ipcRenderer.send('action:acquire:received');
});


export default {
  acquireReceivedService,
}
