import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pickride',
  templateUrl: './pickride.component.html',
  styleUrls: ['./pickride.component.scss']
})
export class PickrideComponent implements OnInit {

  addrideform: FormGroup;
 
  employeeDetails: any = [];
  constructor(private fb: FormBuilder,
    private snackBar: MatsnackbarService,
    public dialogRef: MatDialogRef<PickrideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.employeeDetails = [...this.data]
    this.initForm()
  }



  initForm() {
    this.addrideform = this.fb.group({
      EmployeeID: ['', Validators.required],
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
