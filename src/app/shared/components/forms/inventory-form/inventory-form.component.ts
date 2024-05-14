import {Component, OnInit} from '@angular/core';
import {inventoryLists} from "../../../../models/lists/inventoryLists";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InventoryServiceService} from "../../../services/bridge-services/inventory-service.service";
import {Inventory} from "../../../../models/bridge/inventory";


interface ImageFields {
  [key: string]: keyof Inventory;
}

const imageFields: ImageFields = {
  generalImage: 'generalInformation',
  technicalImage: 'technicalData',
  superstructureImage: 'superstructurePrimary',
  superstructureSecondaryImage: 'superstructureSecondary',
  substructureAbutmentsImage: 'substructureAbutments',
  substructureDetailsImage: 'substructureDetails',
  substructurePilesImage: 'substructurePiles',
  substructureSignalsImage: 'substructureSignals',
  supportsImage: 'supports',
  observationsImage: 'observations'
};

function setImageUrl(inventory: Inventory, key: string, url: string) {
  const path = imageFields[key];
  if (path && inventory[path] && typeof inventory[path] === 'object') {
    (inventory[path] as any).image = url;
  }
}



@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formSubmitted = false;


  typeStepOptions = inventoryLists.typeStepOptions;
  inspectionRequirementOptions = inventoryLists.inspectionRequirementOptions;
  transversalStructuringOptions = inventoryLists.transversalStructuringOptions;
  longitudinalStructuringOptions = inventoryLists.longitudinalStructuringOptions;
  materialConstructionOptions = inventoryLists.materialConstructionOptions;
  stirrupstypeOptions = inventoryLists.stirrupstypeOptions;
  stirrupsMaterialOptions = inventoryLists.stirrupsMaterialOptions;
  stirrupsFoundationTypeOptions = inventoryLists.stirrupsFoundationTypeOptions;
  railingTypeOptions = inventoryLists.railingTypeOptions;
  roadwaySurfaceOptions = inventoryLists.roadwaySurfaceOptions;
  expansionJointOptions = inventoryLists.expansionJointOptions;
  pileTypeOptions = inventoryLists.pileTypeOptions;
  pileMaterialOptions = inventoryLists.pileMaterialOptions;
  foundationTypeOptions = inventoryLists.foundationTypeOptions;
  fixedSupportTypes = inventoryLists.fixedSupportTypes;
  loadDistributionClasses = inventoryLists.loadDistributionClasses;
  snOptions = inventoryLists.snOptions;
  ctOptions = inventoryLists.ctOptions;
  siOptions = inventoryLists.siOptions;
  yearOptions = inventoryLists.yearOptions;
  abscDirection = inventoryLists.abscDirection;
  sectionOptions = inventoryLists.sectionOptions;
  lightOptions = inventoryLists.lightOptions;
  longitudinalOptions = inventoryLists.longitudinalOptions;
  boardWidthOptions = inventoryLists.boardWidthOptions;
  separatorWidthOptions = inventoryLists.separatorWidthOptions
  sidewalkWidthOptions = inventoryLists.sidewalkWidthOptions
  roadwayWidthOptions = inventoryLists.roadwayWidthOptions
  pileHeightOptions = inventoryLists.pileHeightOptions
  abutmentHeightOptions = inventoryLists.abutmentHeightOptions
  supportLengthOptions = inventoryLists.supportLengthOptions
  skewAngleOptions = inventoryLists.skewAngleOptions
  latitudeDegreesOptions = inventoryLists.latitudeDegreesOptions
  longitudeDegreesOptions = inventoryLists.longitudeDegreesOptions
  minutesOptions = inventoryLists.minutesOptions
  secondsOptions = inventoryLists.secondsOptions
  seismicAccelerationCoefficientOptions = inventoryLists.seismicAccelerationCoefficientOptions
  variableLengthOptions = inventoryLists.variableLengthOptions
  brmOptions = inventoryLists.brmOptions
  criticalSpanLengthOptions = inventoryLists.criticalSpanLengthOptions
  classificationFactorOptions = inventoryLists.classificationFactorOptions
  linealOptions = inventoryLists.linealOptions

  imageFiles: { [key: string]: File } = {};


  constructor(private inventoryService: InventoryServiceService) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      identificacionRegional: new FormControl('', Validators.required),
      identificacionCarretera: new FormControl('', Validators.required),
      identificacionPuente: new FormControl('', {
        validators: Validators.required,
        asyncValidators: [this.inventoryService.checkBridgeIdentificationUnique()],
        updateOn: 'blur'
      }),      carretera: new FormControl('', Validators.required),
      pr: new FormControl('', Validators.required),
      regional: new FormControl('', Validators.required),

      tipoDePasoUno: new FormControl('', Validators.required),
      primeroUno: new FormControl('', Validators.required),
      supInfUno: new FormControl('', Validators.required),
      galiboIUno: new FormControl('', Validators.required),
      galiboIMUno: new FormControl('', Validators.required),
      galiboDMUno: new FormControl('', Validators.required),
      galiboDUno: new FormControl('', Validators.required),

      tipoDePasoDos: new FormControl('', Validators.required),
      primeroDos: new FormControl('', Validators.required),
      supInfDos: new FormControl('', Validators.required),
      galiboIDos: new FormControl('', Validators.required),
      galiboIMDos: new FormControl('', Validators.required),
      galiboDMDos: new FormControl('', Validators.required),
      galiboDDos: new FormControl('', Validators.required),

      anioConstruccion: new FormControl('', Validators.required),
      anioReconstruccion: new FormControl('', Validators.required),
      direccionAbs: new FormControl('', Validators.required),
      requisitosInspeccion: new FormControl('', Validators.required),
      numeroSeccionesInspeccion: new FormControl('', Validators.required),
      estacionConteo: new FormControl('', Validators.required),
      fechaRecoleccionDatos: new FormControl('', Validators.required),
      inicialesInspector: new FormControl('', Validators.required),

      numeroLuces: new FormControl('', Validators.required),
      longitudLuzMenor: new FormControl('', Validators.required),
      longitudLuzMayor: new FormControl('', Validators.required),
      longitudTotal: new FormControl('', Validators.required),
      anchoTablero: new FormControl('', Validators.required),
      anchoSeparador: new FormControl('', Validators.required),
      anchoAndenIzquierdo: new FormControl('', Validators.required),
      anchoAndenDerecho: new FormControl('', Validators.required),
      anchoCalzada: new FormControl('', Validators.required),
      anchoEntreBordillos: new FormControl('', Validators.required),
      anchoAcceso: new FormControl('', Validators.required),
      alturaPilas: new FormControl('', Validators.required),
      alturaEstribos: new FormControl('', Validators.required),
      longitudApoyoPilas: new FormControl('', Validators.required),
      longitudApoyoEstribos: new FormControl('', Validators.required),
      puenteTerra: new FormControl('', Validators.required),
      puenteCurva: new FormControl('', Validators.required),
      esviaje: new FormControl('', Validators.required),

      disenoTipo: new FormControl('', Validators.required),
      tipoEstructuracionTransversal: new FormControl('', Validators.required),
      tipoEstructuracionLongitudinal: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),

      disenoTipoSec: new FormControl('', Validators.required),
      tipoEstructuracionTransversalSec: new FormControl('', Validators.required),
      tipoEstructuracionLongitudinalSec: new FormControl('', Validators.required),
      materialSec: new FormControl('', Validators.required),

      tipoEstribos: new FormControl('', Validators.required),
      materialEstribos: new FormControl('', Validators.required),
      tipoCimentacion: new FormControl('', Validators.required),

      tipoBaranda: new FormControl('', Validators.required),
      superficieRodadura: new FormControl('', Validators.required),
      juntaExpansion: new FormControl('', Validators.required),

      tipoPilas: new FormControl('', Validators.required),
      materialPilas: new FormControl('', Validators.required),
      tipoCimentacionPilas: new FormControl('', Validators.required),

      cargaMaxima: new FormControl('', Validators.required),
      velocidadMaxima: new FormControl('', Validators.required),
      otraInfo: new FormControl('', Validators.required),

      apoyosFijosEstribos: new FormControl('', Validators.required),
      apoyosMovilesEstribos: new FormControl('', Validators.required),
      apoyosFijosPilas: new FormControl('', Validators.required),
      apoyosMovilesPilas: new FormControl('', Validators.required),
      apoyosFijosVigas: new FormControl('', Validators.required),
      apoyosMovilesVigas: new FormControl('', Validators.required),
      vehiculoDiseno: new FormControl('', Validators.required),
      claseCarga: new FormControl('', Validators.required),

      propietario: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      administradorVial: new FormControl('', Validators.required),
      proyectista: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),

      latitudGrado: new FormControl('', Validators.required),
      latitudMinuto: new FormControl('', Validators.required),
      latitudSegundo: new FormControl('', Validators.required),
      longitudGrado: new FormControl('', Validators.required),
      longitudMinuto: new FormControl('', Validators.required),
      longitudSegundo: new FormControl('', Validators.required),
      coefAceleracionSismica: new FormControl('', Validators.required),
      pasoCausa: new FormControl('', Validators.required),
      existeVariante: new FormControl('', Validators.required),
      longitudVariante: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),

      longitudLuzCritica: new FormControl('', Validators.required),
      factorClasificacion: new FormControl('', Validators.required),
      fuerzaCortante: new FormControl('', Validators.required),
      momento: new FormControl('', Validators.required),
      lineaCargaRueda: new FormControl('', Validators.required),

    });
  }

  get f() {
    return this.form.controls;
  }

  campoInvalido(campo: string) {
    const control = this.form.get(campo);
    return control && control.touched && control.invalid;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.imageFiles[controlName] = file;
      this.form.get(controlName)?.setValue(file);
    }
  }

  hasImageField(obj: any): obj is { image?: string } {
    return obj && typeof obj === 'object' && 'image' in obj;
  }

  async onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const inventory: Inventory = {
        inventoryDate: new Date(),
        generalInformation: {
          name: this.form.value.nombre,
          image: "",
          regionalIdentification: this.form.value.identificacionRegional,
          roadIdentification: this.form.value.identificacionCarretera,
          bridgeIdentification: this.form.value.identificacionPuente,
          road: this.form.value.carretera,
          pr: this.form.value.pr,
          regional: this.form.value.regional,
        },
        steps: {
          stepTypeOne: this.form.value.tipoDePasoUno,
          firstOne: this.form.value.primeroUno,
          supInfOne: this.form.value.supInfUno,
          clearanceIOne: this.form.value.galiboIUno,
          clearanceIMOne: this.form.value.galiboIMUno,
          clearanceDMOne: this.form.value.galiboDMUno,
          clearanceDOne: this.form.value.galiboDUno,
          stepTypeTwo: this.form.value.tipoDePasoDos,
          firstTwo: this.form.value.primeroDos,
          supInfTwo: this.form.value.supInfDos,
          clearanceITwo: this.form.value.galiboIDos,
          clearanceIMTwo: this.form.value.galiboIMDos,
          clearanceDMTwo: this.form.value.galiboDMDos,
          clearanceDTwo: this.form.value.galiboDDos,
        },
        administrativeData: {
          constructionYear: this.form.value.anioConstruccion,
          reconstructionYear: this.form.value.anioReconstruccion,
          absDirection: this.form.value.direccionAbs,
          inspectionRequirements: this.form.value.requisitosInspeccion,
          inspectionSectionsNumber: this.form.value.numeroSeccionesInspeccion,
          countingStation: this.form.value.estacionConteo,
          dataCollectionDate: this.form.value.fechaRecoleccionDatos,
          inspectorInitials: this.form.value.inicialesInspector,
        },
        technicalData: {
          lightsNumber: this.form.value.numeroLuces,
          minorSpanLength: this.form.value.longitudLuzMenor,
          majorSpanLength: this.form.value.longitudLuzMayor,
          totalLength: this.form.value.longitudTotal,
          boardWidth: this.form.value.anchoTablero,
          separatorWidth: this.form.value.anchoSeparador,
          leftSidewalkWidth: this.form.value.anchoAndenIzquierdo,
          rightSidewalkWidth: this.form.value.anchoAndenDerecho,
          roadwayWidth: this.form.value.anchoCalzada,
          curbWidth: this.form.value.anchoEntreBordillos,
          accessWidth: this.form.value.anchoAcceso,
          pileHeight: this.form.value.alturaPilas,
          abutmentHeight: this.form.value.alturaEstribos,
          supportLengthOnPiles: this.form.value.longitudApoyoPilas,
          supportLengthOnAbutments: this.form.value.longitudApoyoEstribos,
          embankmentBridge: this.form.value.puenteTerra,
          curveBridge: this.form.value.puenteCurva,
          skewAngle: this.form.value.esviaje,
          geoImage: "",
        },
        superstructurePrimary: {
          designType: this.form.value.disenoTipo,
          transversalStructuringType: this.form.value.tipoEstructuracionTransversal,
          longitudinalStructuringType: this.form.value.tipoEstructuracionLongitudinal,
          material: this.form.value.material,
          image: "",
        },
        superstructureSecondary: {
          designType: this.form.value.disenoTipoSec,
          transversalStructuringType: this.form.value.tipoEstructuracionTransversalSec,
          longitudinalStructuringType: this.form.value.tipoEstructuracionLongitudinalSec,
          material: this.form.value.materialSec,
          image: "",
        },
        substructureAbutments: {
          type: this.form.value.tipoEstribos,
          material: this.form.value.materialEstribos,
          foundationType: this.form.value.tipoCimentacion,
          image: "",
        },
        substructureDetails: {
          railingType: this.form.value.tipoBaranda,
          roadwaySurface: this.form.value.superficieRodadura,
          expansionJoint: this.form.value.juntaExpansion,
          image: "",
        },
        substructurePiles: {
          type: this.form.value.tipoPilas,
          material: this.form.value.materialPilas,
          foundationType: this.form.value.tipoCimentacionPilas,
          image: "",
        },
        substructureSignals: {
          maxLoad: this.form.value.cargaMaxima,
          maxSpeed: this.form.value.velocidadMaxima,
          otherInfo: this.form.value.otraInfo,
          image: "",
        },
        supports: {
          fixedSupportsOnAbutments: this.form.value.apoyosFijosEstribos,
          movableSupportsOnAbutments: this.form.value.apoyosMovilesEstribos,
          fixedSupportsOnPiles: this.form.value.apoyosFijosPilas,
          movableSupportsOnPiles: this.form.value.apoyosMovilesPilas,
          fixedSupportsOnBeams: this.form.value.apoyosFijosVigas,
          movableSupportsOnBeams: this.form.value.apoyosMovilesVigas,
          designVehicle: this.form.value.vehiculoDiseno,
          loadDistributionClass: this.form.value.claseCarga,
          image: "",
        },
        stakeholders: {
          owner: this.form.value.propietario,
          department: this.form.value.departamento,
          roadManager: this.form.value.administradorVial,
          designer: this.form.value.proyectista,
          municipality: this.form.value.municipio,
        },
        geographicPosition: {
          latitudeDegree: this.form.value.latitudGrado,
          latitudeMinute: this.form.value.latitudMinuto,
          latitudeSecond: this.form.value.latitudSegundo,
          longitudeDegree: this.form.value.longitudGrado,
          longitudeMinute: this.form.value.longitudMinuto,
          longitudeSecond: this.form.value.longitudSegundo,
          seismicAccelerationCoefficient: this.form.value.coefAceleracionSismica,
          causewayPassage: this.form.value.pasoCausa,
          variantExists: this.form.value.existeVariante,
          variantLength: this.form.value.longitudVariante,
          condition: this.form.value.estado,
        },
        legalTrafficLoadCapacity: {
          criticalSpanLength: this.form.value.longitudLuzCritica,
          classificationFactor: this.form.value.factorClasificacion,
        },
        transportLoadCapacity: {
          shearForce: this.form.value.fuerzaCortante,
          moment: this.form.value.momento,
          wheelLoadLine: this.form.value.lineaCargaRueda,
        },
        observations: {
          notes: this.form.value.observaciones || "",
          image: "",
        }
      };

      const imageUrls: { [key: string]: string } = {};

      // Subir las imágenes y obtener las URLs
      for (const key in imageFields) {
        if (this.imageFiles[key]) {
          const filePath = `images/${inventory.generalInformation.bridgeIdentification}/${key}_${new Date().getTime()}`;
          imageUrls[key] = await this.inventoryService.uploadImage(this.imageFiles[key], filePath);
        }
      }

      // Asigna las URLs de las imágenes al inventario final
      for (const key in imageUrls) {
        if (imageUrls.hasOwnProperty(key)) {
          setImageUrl(inventory, key, imageUrls[key]);
        }
      }

      // Eliminar campos de imagen si no se subieron imágenes
      for (const key in imageFields) {
        if (!imageUrls[key]) {
          const path = imageFields[key];
          if (inventory[path] && typeof inventory[path] === 'object') {
            delete (inventory[path] as any).image;
          }
        }
      }

      try {
        await this.inventoryService.createInventory(inventory);
        console.log('Formulario enviado:', inventory);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      console.log('El formulario no es válido');
    }
  }

}
