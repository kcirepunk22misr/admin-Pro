import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  constructor() {
    // this.reportaObservable().subscribe(
    //   (valor) => console.log('Valor: ', valor),
    //   (err) => console.log('Error: ', err),
    //   () => console.log('Completado')
    // );

    this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  retornaIntervalo() {
    const interval$ = interval(1000).pipe(
      take(4),
      map((valor) => valor + 1)
    );
    return interval$;
  }

  reportaObservable() {
    return new Observable<number>((observer) => {
      let i = -1;

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I llego al valor de 2');
        }
      }, 1000);
    });
  }
}
