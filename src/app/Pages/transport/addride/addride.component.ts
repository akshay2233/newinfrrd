import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';

@Component({
  selector: 'app-ride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.scss']
})
export class AddrideComponent implements OnInit {
  addrideform: FormGroup;
  lstVichleType = [
    { value: 1, viewValue: 'Bike' },
    { value: 2, viewValue: 'Car' },
  ];
  employeeDetails: any = [];
  constructor(private fb: FormBuilder,
    private snackBar: MatsnackbarService,
    public dialogRef: MatDialogRef<AddrideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.employeeDetails = [...this.data]
    this.initForm()
  }



  initForm() {

    this.addrideform = this.fb.group({
      EmployeeID: ['', Validators.required],
      VehicleType: ['', [Validators.required]],
      VehicleNo: ['', [Validators.required]],
      VacantSeats: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      PickupPoint: ['', [Validators.required]],
      Destination: ['', Validators.required],

    });


  }
  onSubmit() {
    
    if (this.addrideform.valid) {
      var params = {
        data: this.addrideform.value,
      }

      this.dialogRef.close(params);

    }
  }

  fnCancel() {
    this.addrideform.reset();
    this.dialogRef.close();

  }

  fnCheckDuplicate() {
    
    var fieldValue = this.addrideform.get('EmployeeID').value;
    if (fieldValue && this.employeeDetails.length > 0) {
      var idx = this.employeeDetails.filter(r => r == fieldValue);
      if (idx && idx.length > 0) {
        this.snackBar.openSnackBar('Ride already created for EmployeeId ' + idx[0], 'error')
        this.addrideform.get('EmployeeID').setValue('');

      }
    }
  }
}
