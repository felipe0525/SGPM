import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {bridge} from "../../../models/bridge/bridge";
import {Inspection, inspectionComponent} from "../../../models/bridge/inspection";
import {BridgeServiceService} from "../../services/bridge-services/bridge-service.service";
import {Router} from "@angular/router";
import {inspectionLists} from "../../../models/lists/inspectionLists";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
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
      photo: ''
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

    if (!this.validateBasicInfo()) {
      alert('Por favor, llene todos los campos');
    }else if(this.formInspection.temperature <0 || this.formInspection.temperature > 50){
      alert('La temperatura debe estar entre 0 y 50');
    } else if (inputDate > today) {
      alert('La fecha no puede ser mayor que el día de hoy');
    } else if (this.formInspection.nextInspectionYear < 2024 || this.formInspection.nextInspectionYear > 2040) {
      alert('El año de la próxima inspección debe estar entre 2024 y 2040');
    } else if (!this.validateRatings()) {
      alert('Las calificaciones deben estar entre 1 y 5');
    } else if (!this.validateMaintainance()) {
      alert('El campo de mantenimiento debe ser + o -');
    } else if (!this.validateSpecializedInspection()) {
      alert('La inspección especial debe ser + o dejarse vacío');
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
      nextInspectionYear: 0,
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
        year: 0,
        cost: 0,
        damage: '',
        photo: [],
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




}
