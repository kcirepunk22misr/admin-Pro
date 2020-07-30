import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passwordIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordInvalid() {
    const password = this.registerForm.get('password').value;
    const password2 = this.registerForm.get('password2').value;

    if (password !== password2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  public get aceptaTermino(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
}
