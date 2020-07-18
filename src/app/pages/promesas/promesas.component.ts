import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuario().then(console.log);
  }

  getUsuario() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }

  prueba() {
    // const promesa = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola');
    //   } else {
    //     reject('Eres cule mk');
    //   }
    // });
    // promesa.then((resp) => {
    //   console.log(resp);
    // });
    // console.log('Fin del initd');
  }
}
