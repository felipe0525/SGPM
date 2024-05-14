import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from '@angular/fire/firestore';
import {Inventory} from '../../../models/bridge/inventory';
import {Observable} from 'rxjs';
import {FirebaseStorage, getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  private _collection = collection(this._firestore, 'inventories');

  getInventories(): Observable<Inventory[]> {
    return collectionData(this._collection, {idField: 'id'}) as Observable<Inventory[]>;
  }

  async getInventory(id: string): Promise<Inventory | undefined> {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Inventory;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      return undefined;
    }
  }

  async getBridgeName(bridgeIdentification: string): Promise<string | undefined> {
    try {
      const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
      const inventoriesSnapshot = await getDocs(q);
      if (inventoriesSnapshot.empty) {
        return undefined;
      } else {
        const inventoryData = inventoriesSnapshot.docs[0].data();
        return inventoryData['generalInformation'].name;
      }
    } catch (error) {
      console.error('Error fetching bridge name:', error);
      return undefined;
    }
  }


  async createInventory(inventory: Inventory): Promise<DocumentReference<DocumentData>> {
    return await addDoc(this._collection, inventory);
  }

  async updateInventory(id: string, inventory: Inventory): Promise<void> {
    return await updateDoc(this.document(id), {...inventory});
  }

  async deleteInventory(id: string): Promise<void> {
    return await deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `inventories/${id}`);
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(this._storage as unknown as FirebaseStorage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  checkBridgeIdentificationUnique(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const bridgeIdentification = control.value;
      const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty ? null : {bridgeIdentificationNotUnique: true};
    };
  }

  async getBridgeBasicInfo(bridgeId: any) {
    try {
      const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventoriesSnapshot = await getDocs(q);
      if (inventoriesSnapshot.empty) {
        return undefined;
      } else {
        const inventoryData = inventoriesSnapshot.docs[0].data();
        return {
          bridgeIdentification: inventoryData['generalInformation'].bridgeIdentification,
          name: inventoryData['generalInformation'].name,
          pr: inventoryData['generalInformation'].pr,
          regional: inventoryData['generalInformation'].regional,
          regionalIdentification: inventoryData['generalInformation'].regionalIdentification,
          road: inventoryData['generalInformation'].road,
          roadIdentification: inventoryData['generalInformation'].roadIdentification,
        };
      }
    } catch (error) {
      console.error('Error fetching bridge name:', error);
      return undefined;
    }
  }

}
