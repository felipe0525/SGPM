import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {Observable, of} from "rxjs";


const PATH = 'bridge';
@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  inspection: any;

  getInspections(bridgeId: number):Observable<any> {
    //return collectionData(this._collection, { idField: 'id' }) as Observable<any>;
    return new Observable<any>(subscriber => {
      subscriber.next([
        {
          inspectionId: 1,
          date: 25-10-2021,
          temperature: 10,
          inspector: 'roberto',
          administrator: 'camilo',
          nextInspectionYear: 2024,
          bridgeSurfaceName: 'jkdsf',
          inspectionComponents: [
            {
              componentName: 'Superficie del puente',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Juntas de expansión',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Andenes/ bordillos',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Barandas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Conos/ taludes',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Aletas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Estribos',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Pilas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Apoyos',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm',
              generalComments: 'no hay comentarios'},
          ],
          generalComments: 'no hay comentarios',
        },
        {
          inspectionId: 2,
          date: 25-10-2021,
          temperature: 10,
          inspector: 'roberto',
          administrator: 'camilo',
          nextInspectionYear: 2024,
          bridgeSurfaceName: 'jkdsf',
          inspectionComponents: [
            {
              componentName: 'Superficie del puente',
              rating: 0,
              damageType: 10,
              repairType: 'B',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Juntas de expansión',
              rating: 0,
              damageType: 10,
              repairType: 'C',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Andenes/ bordillos',
              rating: 0,
              damageType: 10,
              repairType: 'K',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Barandas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Conos/ taludes',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Aletas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Estribos',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Pilas',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm2',
              generalComments: 'no hay comentarios',
            },
            {
              componentName: 'Apoyos',
              rating: 0,
              damageType: 10,
              repairType: 'A',
              repairQuantity: 10,
              repairUnit: 'm',
              generalComments: 'no hay comentarios'},
          ],
          generalComments: 'no hay comentarios',
        }
      ]);
    });
  }

  setInspection(inspection: any) {
    this.inspection = inspection;

  }
  getInspectionByInspectionId(inspectionId: number | null) {
    //return getDoc(doc(this._collection, inspectionId));
    return of(this.inspection);
  }

  generateInspectionId() {
    const number = Math.floor(Math.random() * 1000);
    return of(number);
  }
}
