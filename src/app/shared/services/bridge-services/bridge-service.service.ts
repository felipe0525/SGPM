import {Injectable} from '@angular/core';
import {bridge} from "../../../models/bridge/bridge";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BridgeServiceService {
  private inspection: any;

  constructor() {
  }

  generarDatosQuemados(): bridge {
    return this.generarPuente();
  }

  generarPuente(): bridge {
    return {
      idBridge: 1,
      name: 'Puente de ejemplo',
      regionalId: 1,
      roadId: 123,
      bridgeId: 123,
      road: 'Nombre de la carretera',
      pr: 'PR123',
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
  }

  getBridgeInfo() {
    return {
      idBridge: 1,
      name: 'Puente de ejemplo',
      regionalId: 1,
      roadId: 123,
      bridgeId: 123,
      road: 'Nombre de la carretera',
      pr: 'PR123',
    };
  }

  getBridgeName(bridgeId: number):Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('Puente de ejemplo');
    });

  }

  getBridgeBasicInfo(bridgeId: any):Observable<bridge> {
    /*return new Observable<bridge>(subscriber => {
      subscriber.next(this.generarPuente());
    });*/
    const bridge = this.generarPuente();
    return of(bridge)
  }

  sendInspection(inspection: any) {
    console.log(inspection);
    this.inspection = inspection;
  }
}
