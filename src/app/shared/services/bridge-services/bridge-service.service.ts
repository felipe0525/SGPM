import {Injectable} from '@angular/core';
import {bridge} from "../../../models/bridge/bridge";

@Injectable({
  providedIn: 'root'
})
export class BridgeServiceService {

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
}
