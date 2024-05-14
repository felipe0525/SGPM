import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
  DocumentReference,
  DocumentData, where, getDocs, query
} from '@angular/fire/firestore';
import { Inventory } from '../../../models/bridge/inventory';
import { Observable } from 'rxjs';
import {getDownloadURL, ref, uploadBytes, Storage, FirebaseStorage} from "@angular/fire/storage";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  private _collection = collection(this._firestore, 'inventories');

  getInventories(): Observable<Inventory[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Inventory[]>;
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

  async createInventory(inventory: Inventory): Promise<DocumentReference<DocumentData>> {
    return await addDoc(this._collection, inventory);
  }

  async updateInventory(id: string, inventory: Inventory): Promise<void> {
    return await updateDoc(this.document(id), { ...inventory });
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
      return querySnapshot.empty ? null : { bridgeIdentificationNotUnique: true };
    };
  }
}
