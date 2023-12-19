import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { Campus } from '../../../models/campus';
import { JobPosition } from '../../../models/jposition';
import { Worker } from '../../../models/worker';
import { UploadService } from '../../../services/upload.service';
import { forkJoin, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-registersurvey',
  templateUrl: './registersurvey.component.html',
  styleUrl: './registersurvey.component.css'
})
export class RegistersurveyComponent implements OnInit{
  campus: Campus[] = [];
  selectedCampus :Campus = {} as Campus;
  jobP : JobPosition = {} as JobPosition;
  worker : Worker = {} as Worker;
  constructor(private formService : FormService , private uploadService : UploadService){

  }
  ngOnInit(): void {
  this.getCampus()
  }
 
  getCampus() {
    this.formService.getCampus().subscribe(
      (data) => {
        this.campus = data; 

      },
      error => {
        console.error('Error al obtener campus:', error);
      }
    );
  }

  onFileSelected(event: any, property: string) {
    const file: File = event.target.files[0];
    if (file) {
      if (property === 'imagen_trabajador1') {
        this.worker.imagen_trabajador1 = file;
      } else if (property === 'imagen_trabajador2') {
        this.worker.imagen_trabajador2 = file;
      }
    }
  }


  createJobPosition() {
    const jobP = {
      id_puesto_trabajo: this.jobP.id_puesto_trabajo,
      departamento_area: this.jobP.departamento_area,
      descripcion: this.jobP.descripcion,
      id_campus_pertenece: this.selectedCampus.id_campus
    };
  
    this.formService.createJobPosition(jobP).subscribe(
      () => {
        const image1 = this.worker.imagen_trabajador1;
        const image2 = this.worker.imagen_trabajador2;
  
        if (!image1 || !image2) {
          console.error('No se han seleccionado todas las imágenes.');
          return;
        }
  
        this.uploadService.uploadImage(image1).subscribe(
          (response1: any) => {
            this.uploadService.uploadImage(image2).subscribe(
              (response2: any) => {
                const worker = {
                  Nombre: this.worker.Nombre,
                  Apellido: this.worker.Apellido,
                  Edad: this.worker.Edad,
                  Genero: this.worker.Genero,
                  imagen_trabajador1: response1.imageUrl,
                  imagen_trabajador2: response2.imageUrl,
                  id_puesto_trabajo: jobP.id_puesto_trabajo
                };
  
                this.formService.createWorker(worker).subscribe(
                  () => {
                    console.log('¡Trabajador creado con éxito!');
                  },
                  (error) => {
                    console.error('Error al crear trabajador:', error);
                  }
                );
              },
              (error) => {
                console.error('Error al subir imagen 2:', error);
              }
            );
          },
          (error) => {
            console.error('Error al subir imagen 1:', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear puesto de trabajo:', error);
      }
    );
  }
  
  
}