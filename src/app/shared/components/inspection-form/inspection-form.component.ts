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

  onSubmit() {
    const today = new Date();
    const inputDate = new Date(this.formInspection.date);
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
      swal(
        '¡Error!',
        'Por favor, verifica los campos de reparación',
        'error'
      )
    } else {
      swal(
        '¡Éxito!',
        'Inspección enviada con éxito',
        'success'
      )
      this.router.navigate(['/inspections']);
    }
  }




  validateRatings(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {

        if (component.rating < 0 || component.rating > 5) {
          swal(
            '¡Error!',
            'Por favor, seleccione una calificación para el componente ' + component.name,
            'error'
          )
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

      if (component.maintenance !== '+') {
        if (component.maintenance !== '-') {
          swal(
            '¡Error!',
            'Por favor, seleccione una opción para el campo de mantenimiento del componente ' + component.name,
            'error'
          )
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
        swal(
          '¡Error!',
          'Por favor, seleccione una opción para la inspección especial del componente ' + component.name,
          'error'
        )
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
          if (!repair.type || repair.type.trim() === '') {
            swal(
              '¡Error!',
              'Por favor, seleccione un tipo de reparación para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.quantity <= 0) {
            swal(
              '¡Error!',
              'Por favor, ingrese una cantidad válida para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.year < 2024 || repair.year > 2040) {
            swal(
              '¡Error!',
              'Por favor, seleccione un año para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.cost <= 0) {
            swal(
              '¡Error!',
              'Por favor, ingrese un costo válido para el componente ' + component.name,
              'error'
            )
            return false;
          }
          if (!repair.damage || repair.damage.trim() === '') {
            swal(
              '¡Error!',
              'Por favor, ingrese una observación para el componente ' + component.name,
              'error'
            )
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
    const repairOptions = this.repairOptionsByComponent[componentName];
    if (repairOptions) {
      return repairOptions;
    } else {
      return [];
    }
  }

  updateUnit(componentIndex: number, repairIndex: number, repairType: string, componentName: string): void {
    const repairOptions = this.repairOptionsByComponent[componentName] || [];
    const selectedRepair = repairOptions.find((option: { type: string; }) => option.type === repairType);

    if (selectedRepair) {
      this.formInspection.inspectionComponents[componentIndex].repairs[repairIndex].unit = selectedRepair.unit;
    }
  }


  uploadPhotos(event: Event, repair: any): void {
    const fileList = (event.target as HTMLInputElement).files;

    if (!fileList || fileList.length === 0) {
      swal(
        '¡Error!',
        'No se han seleccionado archivos.',
        'error'
      )
      return;
    }

    if (repair.photos.length + fileList.length > 5) {
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
      repair.photos.splice(index, 1);
    }
  }

  clickFileInput(i: number, j: number): void {
    const fileInput = document.getElementById(`repairPhoto${i}${j}`);
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    } else {
      swal(
        '¡Error!',
        'Elemento no encontrado:', `repairPhoto${i}${j}`,
        'error'
      )
    }
  }

}
