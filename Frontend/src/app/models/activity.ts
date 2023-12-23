export interface Activity {
    id_actividad?: number;
    nombre_actividad: string;
    descripcion: string;
    imagen1: File; 
    imagen2: File;
    imagen3: File;
    id_trabajador_pertenece: number;
}