import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-incrementar',
  templateUrl: './incrementar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncrementarComponent implements OnInit {
  @Input() progress: number = 50;
  @Input() btnClass: string;
  @Output() valorSalida: EventEmitter<number>;

  constructor() {
    this.valorSalida = new EventEmitter();
    this.btnClass = 'btn btn-primary';
  }

  ngOnInit(): void {}

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progress = 100);
    }

    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return (this.progress = 0);
    }

    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progress = 100;
    } else if (nuevoValor <= 0) {
      this.progress = 0;
    } else {
      this.progress = nuevoValor;
    }

    this.valorSalida.emit(this.progress);
  }
}
