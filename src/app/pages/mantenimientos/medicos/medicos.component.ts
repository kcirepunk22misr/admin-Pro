import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resp) => {
      this.medicos = resp;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).subscribe(() => {
          Swal.fire(
            'Medico borrado!',
            `${medico.nombre} fue eliminado correcto`,
            'success'
          );
          this.cargarMedicos();
        });
      }
    });
  }
}
