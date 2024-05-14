export interface Inspection {
  inspectionId: number;
  date: Date;
  temperature: number;
  inspector: string;
  administrator: string;
  nextInspectionYear: number;
  bridgeSurfaceName: string;
  inspectionComponents: inspectionComponent[];
  generalComments: string;

}

export interface inspectionComponent {
  name: string;
  rating: number;
  maintenance: string;
  specializedInspection: string;
  damageType: string;
  repairs: repair[];
  photos: File[];
}



export interface repair {
  type: string;
  quantity: number;
  unit: string;
  year: number;
  cost: number;
  damage: string;
}
