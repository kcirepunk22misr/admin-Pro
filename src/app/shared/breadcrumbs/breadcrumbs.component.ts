import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router, private title: Title) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(
      ({ titulo }: { titulo: string }) => {
        this.titulo = titulo;
        // document.title = `AdminPro - ${titulo}`;
        this.title.setTitle(`AdminPro - ${titulo}`);
      }
    );
  }

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
