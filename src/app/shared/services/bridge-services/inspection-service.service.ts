import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore, getDoc,
  getDocs,
  query, setDoc, updateDoc,
  where
} from '@angular/fire/firestore';
import {from, map, Observable, of, switchMap} from "rxjs";
import {Inspection} from "../../../models/bridge/inspection";


const PATH = 'inventories';

@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {

  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);
  inspection: any;

  getInspections(bridgeIdentification: number): Observable<any[]> {
    const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
    return collectionData(q, {idField: 'id'}).pipe(
      switchMap((inventories: any[]) => {
        if (inventories.length === 0) {
          return of([]);
        } else {
          const inventoryId = inventories[0].id;
          const inventoryDocRef = doc(this._firestore, `${PATH}/${inventoryId}`);
          const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
          return collectionData(inspectionCollectionRef).pipe(
            map(inspections => {
              return inspections.map(inspection => ({
                id: inspection['inspectionId'],
                administrator: inspection['administrator'],
                inspector: inspection['inspector'],
                date: inspection['date']
              }));
            })
          );

        }
      })
    );
  }


  async setInspection(bridgeId: any, inspection: Inspection): Promise<DocumentReference<DocumentData>> {
    const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
    const inventoriesSnapshot = await getDocs(q);
    const inventoryDocRef = inventoriesSnapshot.docs[0].ref;
    const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
    return addDoc(inspectionCollectionRef, inspection);
    /*
        // Subir la inspección a Firestore
        const inspectionRef = await addDoc(inspectionCollectionRef, inspection);

        // Subir fotos a Firebase Storage
        await Promise.all(inspection.inspectionComponents.map(async (component, componentIndex) => {
          await Promise.all(component.photos.map(async (photoUrl, photoIndex) => {
            const photoBlob = await this.fetchPhotoBlob(photoUrl); // Función para obtener el blob de la foto
            const storageRef = ref(getStorage(), `inspections/${inspection.inspectionId}/${componentIndex}/${photoIndex}`);
            await uploadBytes(storageRef, photoBlob);
          }));
        }));

        return inspectionRef;*/
  }


  async getInspection(bridgeIdentification: any, inspectionId: any): Promise<Inspection | null> {
    try {
      // Buscar el inventario con el ID proporcionado
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
      const inventorySnapshot = await getDocs(inventoryQuery);

      // Verificar si se encontró el inventario
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return null;
      }

      // Obtener la referencia al documento de inventario encontrado
      const inventoryDocRef = inventorySnapshot.docs[0].ref;
      console.log('Path al inventario:', inventoryDocRef.path);

      // Obtener las inspecciones dentro del inventario
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
      console.log('Path a las inspecciones:', inspectionCollectionRef.path);


      const inspectionsQuery = query(inspectionCollectionRef, where('inspectionId', '==', parseInt(inspectionId)));
      const inspectionsSnapshot = await getDocs(inspectionsQuery);

      // Verificar si se encontró alguna inspección con el ID proporcionado
      if (inspectionsSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return null;
      }

      // Obtener el primer documento de inspección encontrado (asumiendo que solo hay una coincidencia)
      const inspectionData = inspectionsSnapshot.docs[0].data();
      console.log('Información de la inspección:', inspectionData);

      // Convertir los datos a los tipos definidos en el modelo
      const inspection: Inspection = {
        inspectionId: inspectionData['inspectionId'],
        date: inspectionData['date'], // Convertir el timestamp a Date
        temperature: inspectionData['temperature'],
        inspector: inspectionData['inspector'],
        administrator: inspectionData['administrator'],
        nextInspectionYear: inspectionData['nextInspectionYear'],
        inspectionComponents: inspectionData['inspectionComponents'],
        generalComments: inspectionData['generalComments']
      };

      return inspection;
    } catch (error) {
      console.error('Error al obtener la inspección:', error);
      return null;
    }
  }



  async generateInspectionId(): Promise<number | null> {
    let id: number;
    let repeat: boolean;

    do {
      id = Math.floor(Math.random() * 1000000);
      repeat = await this.checkIfIdExists(id);
    } while (repeat);

    return id;
  }

  async checkIfIdExists(id: number): Promise<boolean> {
    try {
      const inventoriesSnapshot = await getDocs(this._collection);

      for (const inventoryDoc of inventoriesSnapshot.docs) {
        const inspectionCollectionRef = collection(inventoryDoc.ref, 'inspections');
        const inspectionsSnapshot = await getDocs(inspectionCollectionRef);

        for (const inspectionDoc of inspectionsSnapshot.docs) {
          if (inspectionDoc.id === id.toString()) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      console.error('Error al verificar la existencia del ID de inspección:', error);
      return true;
    }
  }

  async updateInspection(bridgeId: any, updatedInspection: Inspection): Promise<void> {
    try {
      // Buscar el inventario con el ID proporcionado
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventorySnapshot = await getDocs(inventoryQuery);

      // Verificar si se encontró el inventario
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return;
      }

      // Obtener la referencia al documento de inventario encontrado
      const inventoryDocRef = inventorySnapshot.docs[0].ref;

      // Obtener las inspecciones dentro del inventario
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');

      // Realizar una consulta para encontrar la inspección específica
      const inspectionQuery = query(inspectionCollectionRef, where('inspectionId', '==', updatedInspection.inspectionId));
      const inspectionSnapshot = await getDocs(inspectionQuery);

      // Verificar si se encontró la inspección
      if (inspectionSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return;
      }

      // Obtener la referencia al documento de inspección encontrado
      const inspectionDocRef = inspectionSnapshot.docs[0].ref;

      // Actualizar los datos de la inspección con los nuevos datos
      await updateDoc(inspectionDocRef, {...updatedInspection});

      console.log('Inspección actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la inspección:', error);
    }
  }


  async deleteInspection(bridgeId: any, id: any): Promise<void> {
    try {
      // Buscar el inventario con el ID proporcionado
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventorySnapshot = await getDocs(inventoryQuery);

      // Verificar si se encontró el inventario
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return;
      }

      // Obtener la referencia al documento de inventario encontrado
      const inventoryDocRef = inventorySnapshot.docs[0].ref;

      // Obtener las inspecciones dentro del inventario
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');

      // Realizar una consulta para encontrar la inspección específica
      const inspectionQuery = query(inspectionCollectionRef, where('inspectionId', '==', id));
      const inspectionSnapshot = await getDocs(inspectionQuery);

      // Verificar si se encontró la inspección
      if (inspectionSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return;
      }

      // Obtener la referencia al documento de inspección encontrado
      const inspectionDocRef = inspectionSnapshot.docs[0].ref;

      // Eliminar la inspección
      await deleteDoc(inspectionDocRef);

      console.log('Inspección eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la inspección:', error);
    }
  }

}
