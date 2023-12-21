import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { Campus } from '../../../models/campus';
import { JobPosition } from '../../../models/jposition';
import { Worker } from '../../../models/worker';
import { UploadService } from '../../../services/upload.service';
import { forkJoin, map } from 'rxjs';
import { FlootMeasurements } from '../../../models/fmeasures';


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
  workerAux : any;
  flootM : FlootMeasurements = {} as FlootMeasurements;
  constructor(private formService : FormService , private uploadService : UploadService){
    this.workerAux = {
      imagen_trabajador1: { file: null, url: null },
      imagen_trabajador2: { file: null, url: null }
    };
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
      const reader = new FileReader();
      reader.onload = () => {
        if (property === 'imagen_trabajador1') {
          this.workerAux.imagen_trabajador1.file = file;
          this.workerAux.imagen_trabajador1.url = reader.result as string;
        } else if (property === 'imagen_trabajador2') {
          this.workerAux.imagen_trabajador2.file = file;
          this.workerAux.imagen_trabajador2.url = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

  createEval() {
    const jobPosition = {
      id_puesto_trabajo: this.jobP.id_puesto_trabajo,
      departamento_area: this.jobP.departamento_area,
      id_campus_pertenece: this.selectedCampus.id_campus
    };
  
    const image1 = this.workerAux.imagen_trabajador1.file;
    const image2 = this.workerAux.imagen_trabajador2.file;
  
    if (!image1 || !image2) {
      console.error('No se han seleccionado todas las imágenes.');
      return;
    }
  
    const uploadImage1$ = this.uploadService.uploadImage(image1);
    const uploadImage2$ = this.uploadService.uploadImage(image2);
  
    forkJoin({ image1: uploadImage1$, image2: uploadImage2$ }).pipe(
      map((responses: any) => ({
        imagen_trabajador1: responses.image1.imageUrl,
        imagen_trabajador2: responses.image2.imageUrl
      }))
    ).subscribe(
      (imageUrls: any) => {
        const workerData = {
          Nombre: this.worker.Nombre,
          Apellido: this.worker.Apellido,
          Edad: this.worker.Edad,
          Genero: this.worker.Genero,
          id_puesto_trabajo: jobPosition.id_puesto_trabajo,
          ...imageUrls
        };
  
        this.formService.createJobPosition(jobPosition).subscribe(
          () => {
            this.formService.createWorker(workerData).subscribe(
              (response: any) => {
                const flootMeasures = {
                  masa: this.flootM.masa,
                  estatura: this.flootM.estatura,
                  altura_ojo: this.flootM.altura_ojo,
                  altura_hombro: this.flootM.altura_hombro,
                  altura_codo: this.flootM.altura_codo,
                  altura_entre_pierna: this.flootM.altura_entre_pierna,
                  profundidad_cuerpo_de_pie: this.flootM.profundidad_cuerpo_de_pie,
                  anchura_cadera_pie: this.flootM.anchura_cadera_pie,
                  id_trabajador_pertenece: response
                };
  
                this.formService.flootMeasuresment(flootMeasures).subscribe(() => {
                  console.log("Mediciones creadas exitosamente");
                });
              },
              (error) => {
                console.error('Error al crear trabajador:', error);
              }
            );
          },
          (error) => {
            console.error('Error al crear puesto de trabajo:', error);
          }
        );
      },
      (error) => {
        console.error('Error al subir imagen:', error);
      }
    );
  }
  
  
  
}