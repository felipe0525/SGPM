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
export class BridgeServiceService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  private inspection: any;

  constructor() {
  }

  getBridgeName(bridgeId: number):Observable<string> {
    //Get the bridge from database and return the name
  return of("Bridge Name");
  }

  getBridgeBasicInfo(bridgeId: any):Observable<any> {
    /*return new Observable<bridge>(subscriber => {
      subscriber.next(this.generarPuente());
    });*/
    return of(true)
  }

  sendInspection(inspection: any) {
    console.log(inspection);
    this.inspection = inspection;
  }
}
