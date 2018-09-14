import { Observable } from 'rxjs/Observable';
const { ipcRenderer } = require('electron')

export const acquireReceivedService = () => {
  return Observable.create((observer) => {
    ipcRenderer.on('replay:acquire:received', (event, arg) => {
      observer.next(arg);
    });
  });
}

export const acquireReceivedData = () => {
  ipcRenderer.send('action:acquire:received');
}

export default {
  acquireReceivedService,
  acquireReceivedData
}
