import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InspectionServiceService} from "../../../services/bridge-services/inspection-service.service";
import {NgForOf} from "@angular/common";
import {BridgeServiceService} from "../../../services/bridge-services/bridge-service.service";

@Component({
  selector: 'app-table-inspections',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './table-inspections.component.html',
  styleUrl: './table-inspections.component.css'
})
export class TableInspectionsComponent implements OnInit{
  bridgeId: number = -1;
  bridgeName: string = '';
  inspections: any[] =[
    {
      inspectionId:0,
      administrator: '',
      inspector: '',
      date: Date,
    }
  ]
  constructor(
    private inspectionService: InspectionServiceService,
    private bridgeService: BridgeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bridgeId = this.route.snapshot.params['id'];
    this.bridgeService.getBridgeName(this.bridgeId).subscribe((data: any) => {
      this.bridgeName = data;
    });
    /*
    this.inspectionService.getInspections(this.bridgeId).subscribe((data: any) => {
      this.inspections = data;
    });*/
    this.inspections = [
      {
        inspectionId: 1,
        administrator: 'lucas',
        inspector: 'tomas',
        date: 25-10-2021,
      },
      {
        inspectionId: 2,
        administrator: 'lucas',
        inspector: 'tomas',
        date: 25-10-2021,
      },
      {
        inspectionId: 3,
        administrator: 'lucas',
        inspector: 'tomas',
        date: 25-10-2021,
      }
    ];

  }

  viewInspection(inspectionId: number) {
    this.router.navigate(['home/bridge-management/inspections/inspection-bridge', inspectionId], { queryParams: { mode: 'view', bridgeId : this.bridgeId } });

  }
  editInspection(inspectionId: number) {
    this.router.navigate(['home/bridge-management/inspections/inspection-bridge', inspectionId], { queryParams: { mode: 'edit', bridgeId : this.bridgeId } });
  }
  createInspection() {
    this.router.navigate(['home/bridge-management/inspections/inspection-bridge', this.bridgeId], { queryParams: { mode: 'new' } });
  }

  goToInventary() {
    //this.router.navigate(['home/bridge-management/inventories/inventory-bridge', this.bridgeId])
    this.router.navigate(['home/bridge-management/inventories/inventory-bridge'])
  }
}
