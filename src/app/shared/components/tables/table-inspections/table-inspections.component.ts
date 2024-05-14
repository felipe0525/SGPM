import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InspectionServiceService} from "../../../services/bridge-services/inspection-service.service";
import {NgForOf} from "@angular/common";
import {BridgeServiceService} from "../../../services/bridge-services/bridge-service.service";
import {IconDelete} from "../../../../../assets/icons/delete";
import {IconEdit} from "../../../../../assets/icons/edit";
import {IconSettings} from "../../../../../assets/icons/settings";
import {IconView} from "../../../../../assets/icons/view";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-table-inspections',
  standalone: true,
  imports: [
    NgForOf,
    IconDelete,
    IconEdit,
    IconSettings,
    IconView,
    FormsModule
  ],
  templateUrl: './table-inspections.component.html',
  styleUrl: './table-inspections.component.css'
})
export class TableInspectionsComponent implements OnInit{
  searchTerm: string = '';
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
  filteredInspections: any[] = this.inspections;
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
        inspector: 'pablo',
        date: '2021-10-10',
      },
      {
        inspectionId: 2,
        administrator: 'lucas',
        inspector: 'erick',
        date: '2021-10-10',
      },
      {
        inspectionId: 3,
        administrator: 'bran',
        inspector: 'tomas',
        date: '2021-10-10',
      }
    ];
    this.filteredInspections = this.inspections;

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


  filterInspections() {
    console.log('Search Term:', this.searchTerm);
    if (!this.searchTerm.trim()) {
      // If searchTerm is empty, show all inspections
      console.log('No Search Term. Showing all inspections.');
      this.filteredInspections = this.inspections;
    } else {
      // Filter inspections based on searchTerm
      console.log('Filtering Inspections.');
      this.filteredInspections = this.inspections.filter(inspection =>
        inspection.administrator.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        inspection.inspector.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        inspection.inspectionId.toString().includes(this.searchTerm.toLowerCase()) || // Convert inspectionId to string for comparison
        inspection.date.toLowerCase().includes(this.searchTerm.toLowerCase()) // Ensure date is in string format
      );
    }
    console.log('Filtered Inspections:', this.filteredInspections);
  }
}
