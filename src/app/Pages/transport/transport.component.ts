import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AddrideComponent } from './addride/addride.component';
import { PickrideComponent } from './pickride/pickride.component';
import { DetailsComponent } from './details/details.component';


@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})

export class TransportComponent implements OnInit {
  dialogRef = null;
  dialogRefPickRide = null;
  dialogRefDetails = null;


  displayedColumns: string[] = ['EmployeeID', 'VehicleType', 'VehicleNo', 'Time', 'PickupPoint', 'Destination', 'Availability', 'action'];
  dataSource = new MatTableDataSource([]);
  backUpdetails: any = [];
  rideDetails: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  curDate = new Date();
  constructor(
    private dialog: MatDialog,
    private snackBar: MatsnackbarService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.fnLoadIntialData();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fnGetEmpDetails() {
    var reqData: any = [];

    if (this.rideDetails && this.rideDetails) {
      this.rideDetails.filter(r => {
        if (r.bookedEmployee && r.bookedEmployee.length > 0) {
          reqData = [...reqData, ...r.bookedEmployee]
        }
      })
    }

    return reqData;
  }

  fnAddRide(data) {
    
    var reqData = this.fnGetEmpDetails()
    this.dialogRef = this.dialog.open(AddrideComponent, {
      width: '550px',
      disableClose: true,
      data: reqData
    });
    this.dialogRef.afterClosed().subscribe(result => {      
      if (result && result.data) {
        var reqData: any = result.data;
        reqData.bookedEmployee = [];
        reqData.bookedEmployee.push(reqData.EmployeeID);
        if (reqData.VacantSeats == 0) {
          reqData.available = 0;
          reqData.VacantSeats = 1;
        } else {
          reqData.available = (reqData.VacantSeats - reqData.bookedEmployee.length);

        }
        this.rideDetails = this.snackBar.fnGetRideDetails() || [];
        this.rideDetails.unshift(reqData);
        this.dataSource.data = [...this.rideDetails]
        this.snackBar.fnSetRideDetails(this.rideDetails)
        this.snackBar.openSnackBar('Ride Created Success Fully', 'Success');
      }
    });
  }

  fnLoadIntialData() {    
    this.rideDetails = this.snackBar.fnGetRideDetails();
    if (this.rideDetails && this.rideDetails.length > 0) {
      this.dataSource.data = [...this.rideDetails]
    } else {
      this.dataSource.data = []
    }
  }

  fnAddPickRide(item) {    
    var reqData = this.fnGetEmpDetails();
    this.dialogRefPickRide = this.dialog.open(PickrideComponent, {
      width: '550px',
      disableClose: true,
      data: reqData
    });
    this.dialogRefPickRide.afterClosed().subscribe(result => {
      if (result && result.data) {
        this.rideDetails.filter((r: any) => {
          if (r.EmployeeID == item.EmployeeID) {
            r.bookedEmployee.push(result.data.EmployeeID);
            r.available = (r.VacantSeats - r.bookedEmployee.length);
          }
        });
        this.dataSource.data = [...this.rideDetails];
        this.snackBar.fnSetRideDetails(this.rideDetails);
        this.snackBar.openSnackBar('Employee Added to Ride Successfully', 'Success')

      }
    });
  }

  fnViewDetails(item) {
    if (item.bookedEmployee && item.bookedEmployee.length > 0) {
      this.dialogRefDetails = this.dialog.open(DetailsComponent, {
        width: '550px',
        disableClose: true,
        data: item.bookedEmployee
      });

    }
  }
}
