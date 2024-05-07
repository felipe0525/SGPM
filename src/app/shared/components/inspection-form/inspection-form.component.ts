import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {bridge} from "../../../models/bridge/bridge";
import {Inspection, inspectionComponent, repair} from "../../../models/bridge/inspection";
import {BridgeServiceService} from "../../services/bridge-services/bridge-service.service";
import {Router} from "@angular/router";
import {inspectionLists} from "../../../models/lists/inspectionLists";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import swal from "sweetalert";



@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './inspection-form.component.html',
  styleUrl: './inspection-form.component.css'
})
export class InspectionFormComponent {

  inspections: Inspection[] = [];
  bridgeInfo: bridge={
    idBridge: 0,
    name: '',
    regionalId: 0,
    roadId: 0,
    bridgeId: 0,
    road: '',
    pr: '',
    inspections: [],
    inventory: {
      idInventory: 0,
      year: 0,
      length: 0,
      width: 0,
      height: 0,
      material: '',
      condition: '',
      damage: '',
      photos: ''
    },
    municipality: ''
  };
  formInspection: Inspection ={
    inspectionId: 0,
    date: new Date(),
    temperature: 0,
    inspector: '',
    administrator: '',
    nextInspectionYear: 0,
    bridgeSurfaceName: '',
    inspectionComponents: [],
    generalComments: ''
}
  componentNames: string[] = [];
  yearList : number[]=[];
  currentMonthStart: string = ''; // Primera fecha del mes actual
  currentMonthEnd: string = ''; // Última fecha del mes actual
  damageRatingList:any;
  damageTypeList:any;
  repairOptionsByComponent:any;

  constructor(
    private bridgeService: BridgeServiceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.bridgeInfo = this.bridgeService.generarDatosQuemados();
    this.componentNames = ['Superficie del puente', 'Juntas de expansión', 'Andenes/ bordillos', 'Barandas', 'Conos/ taludes', 'Aletas', 'Estribos', 'Pilas', 'Apoyos', 'Losa', 'Vigas/ Largueros/ Diafragmas', 'Elementos de arco', 'Cables/ Pendolones/ Torres / Macizas', 'Elementos de armadura', 'Cauce', 'Otros elementos', 'Puente general'];
    this.formInspection = this.initializeFormInspection();
    this.yearList = inspectionLists.yearList;
    this.damageRatingList = inspectionLists.ratingComponentOptions;
    this.damageTypeList = inspectionLists.damageTypeComponentOptions;
    this.repairOptionsByComponent = inspectionLists.repairTypeComponentOptions;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const start = new Date(currentYear, currentMonth, 1);
    const end = new Date(currentYear, currentMonth + 1, 0);

    this.currentMonthStart = start.toISOString().split('T')[0];
    this.currentMonthEnd = end.toISOString().split('T')[0];

  }


  onSubmit() {
    const today = new Date();
    const inputDate = new Date(this.formInspection.date);
console.log("año",this.formInspection.nextInspectionYear);
    if (!this.validateBasicInfo()) {
      swal(
        '¡Error!',
        'Por favor, llene todos los campos',
        'error'
      )
    }else if(this.formInspection.temperature <0 || this.formInspection.temperature > 50){
      swal(
        '¡Error!',
        'La temperatura debe estar entre 0 y 50',
        'error'
      )
    } else if (inputDate > today) {
      swal(
        '¡Error!',
        'La fecha no puede ser mayor que el día de hoy',
        'error'
      )
    } else if (this.formInspection.nextInspectionYear < 2024 || this.formInspection.nextInspectionYear > 2040) {
      swal(
        '¡Error!',
        'Seleccione un año para la próxima inspección',
        'error'
      )
    } else if (!this.validateRatings()) {
      swal(
        '¡Error!',
        'Por favor, selecciona la calificación de cada componente',
        'error'
      )
    } else if (!this.validateMaintainance()) {
      alert('El campo de mantenimiento debe ser + o -');
      swal(
        '¡Error!',
        'Por favor, selecciona una opción para el campo de mantenimiento',
        'error'
      )
    } else if (!this.validateSpecializedInspection()) {
      swal(
        '¡Error!',
        'Por favor, selecciona una opción para el campo de inspección especial',
        'error'
      )
    } else if (!this.validateRepairFields()) {
      alert('Por favor, verifica los campos de reparación');
    } else {
      alert('Inspección enviada con éxito');
      // Redirigir a la tabla de puentes
      this.router.navigate(['/gestion-puentes']);
    }
  }


  private initializeFormInspection(): Inspection {
    const inspectionComponents: inspectionComponent[] = [];
    if (this.componentNames !== undefined) {
      this.componentNames.forEach(componentName => {
        const newComponent:inspectionComponent = {
          name: componentName,
          rating: -1,
          maintenance: '',
          specializedInspection: '',
          damageType: '',
          repairs: []
        }
        inspectionComponents.push(newComponent);
      });
    }
    //new inspection(0, new Date(), 0, '', '', 0, inspectionComponents, '');
    return {
      inspectionId: 0,
      date: new Date(),
      temperature: 0,
      inspector: '',
      administrator: '',
      nextInspectionYear: -1,
      bridgeSurfaceName: '',
      inspectionComponents: inspectionComponents,
      generalComments: ''
    }
  }

  validateRatings(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {
        if (component.rating < 1 || component.rating > 5) {
          return false;
        }
      }
    }
    return true;
  }


  validateBasicInfo(): boolean {
    return !(this.formInspection.date == null || this.formInspection.temperature == null || this.formInspection.inspector == '' || this.formInspection.administrator == '' || this.formInspection.nextInspectionYear == null);
  }

  validateMaintainance(): boolean {
    // @ts-ignore
    for (const component of this.formInspection.inspectionComponents) {
      console.log(component.maintenance);
      if (component.maintenance !== '+') {
        if (component.maintenance !== '-') {
          return false;
        }
      }
    }
    return true;
  }

  validateSpecializedInspection(): boolean {
    // @ts-ignore
    for (const component of this.formInspection.inspectionComponents) {
      if (component.specializedInspection !== '' && component.specializedInspection !== '+') {
        return false;
      }
    }
    return true;
  }

  validateRepairYear(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {
        for (const repair of component.repairs) {
          if (repair.year < 2024 || repair.year > 2040) {
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }

  private validateRepairFields(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {
        for (const repair of component.repairs) {
          // Validar tipo de reparación
          if (!repair.type || repair.type.trim() === '') {
            return false;
          }

          // Validar cantidad de reparación
          if (repair.quantity <= 0) {
            return false;
          }

          // Validar año de reparación
          if (repair.year < 2024 || repair.year > 2040) {
            return false;
          }

          // Validar costo de reparación
          if (repair.cost <= 0) {
            return false;
          }
          // Validar daño de reparación
          if (!repair.damage || repair.damage.trim() === '') {
            return false;
          }
        }
      }
    }
    return true;
  }




  addRepair(componentIndex: number): void {
    if (this.formInspection && this.formInspection.inspectionComponents &&
      componentIndex >= 0 && componentIndex < this.formInspection.inspectionComponents.length) {
      const newRepair = {
        type: '',
        quantity: 0,
        unit: '',
        year: -1,
        cost: 0,
        damage: '',
        photos: [],
      };
      this.formInspection.inspectionComponents[componentIndex].repairs.push(newRepair);
    }
  }

  removeRepair(componentIndex: number){
    //Remove last repair
    if (this.formInspection && this.formInspection.inspectionComponents &&
      componentIndex >= 0 && componentIndex < this.formInspection.inspectionComponents.length) {
      this.formInspection.inspectionComponents[componentIndex].repairs.pop();
    }
  }


  updateRepairOptions(componentName: string): any[] {
    console.log('Nombre del componente:', componentName);

    // Comprueba si el componente existe en el objeto
    const repairOptions = this.repairOptionsByComponent[componentName];

    console.log('Opciones de reparación:', this.repairOptionsByComponent);
    if (repairOptions) {
      console.log('Opciones de reparación:', repairOptions);
      return repairOptions;
    } else {
      console.log('No se encontraron opciones para el componente:', componentName);
      return []; // Retorna una lista vacía si el componente no existe
    }
  }

  updateUnit(componentIndex: number, repairIndex: number, repairType: string, componentName: string): void {
    console.log('componentIndex', componentIndex);
    const repairOptions = this.repairOptionsByComponent[componentName] || [];
    const selectedRepair = repairOptions.find((option: { type: string; }) => option.type === repairType);

    if (selectedRepair) {
      this.formInspection.inspectionComponents[componentIndex].repairs[repairIndex].unit = selectedRepair.unit;
    }
  }


  uploadPhotos(event: Event, repair: any): void {
    const fileList = (event.target as HTMLInputElement).files;

    if (!fileList || fileList.length === 0) {
      console.error('No se han seleccionado archivos.');
      swal(
        '¡Error!',
        'No se han seleccionado archivos.',
        'error'
      )
      return;
    }

    if (repair.photos.length + fileList.length > 5) {
      console.error('Solo se permiten un máximo de 5 fotos por componente');
      swal(
        '¡Error!',
        'Solo se permiten un máximo de 5 fotos por componente',
        'error'
      )
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      repair.photos.push(fileList[i]);
    }
  }

  createPhotoUrl(photo: File): string {
    return URL.createObjectURL(photo);
  }

  deletePhoto(repair: any, index: number): void {
    if (index >= 0 && index < repair.photos.length) {
      repair.photos.splice(index, 1); // Eliminar la foto en el índice especificado
    }
  }

  clickFileInput(i: number, j: number): void {
    const fileInput = document.getElementById(`repairPhoto${i}${j}`);
    if (fileInput) {
      (fileInput as HTMLInputElement).click(); // Comprobación de null antes de llamar a click()
    } else {
      console.error('Elemento no encontrado:', `repairPhoto${i}${j}`);
    }
  }

}
