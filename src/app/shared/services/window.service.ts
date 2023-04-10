import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() {}


  public beforeUnloadEvent$(): Observable<BeforeUnloadEvent> {
    return new Observable<BeforeUnloadEvent>((observer) => {
      const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
        observer.next(event);
        event.preventDefault();
        event.returnValue = '';
      };
      const unloadHandler = (event: Event) => {
        observer.next(event);
      };

      window.addEventListener('beforeunload', beforeUnloadHandler);
      window.addEventListener('unload', unloadHandler);

      return () => {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
      };
    });
  }

}
