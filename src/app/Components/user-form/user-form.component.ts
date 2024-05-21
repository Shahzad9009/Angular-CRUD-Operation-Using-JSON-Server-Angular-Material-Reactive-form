import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnakBarService } from 'src/app/Services/mat-snak-bar.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  registerForm : FormGroup;

  constructor(
    private _fb : FormBuilder, 
    private _userService: UserService, 
    private _dialogRef: MatDialogRef<UserFormComponent>,
    private _snackBar: MatSnakBarService, 
    @Inject(MAT_DIALOG_DATA)public data:any){

    this.registerForm = this._fb.group({

      department : '', 
      name: '', 
      mobile: '',
      email: '',
      doj : '',
      gender: '',
      salary: '',
      usercode: '',
      status: '',

    });
  }
ngOnInit()
{
  this.registerForm.patchValue(this.data);
}
  onFormSubmit()
  {
    if(this.registerForm.valid){
      if(this.data)
      {
        this._userService.updateUser(this.data.id, this.registerForm.value).subscribe(res => {
          // alert("User Updated Successfully!");
          this._snackBar.openSnackBar('User Updated Successfully!', 'Done');
          this._dialogRef.close(true);
  
        })
      }
      else
      {
        console.log(this.registerForm.value)
      this._userService.addUser(this.registerForm.value).subscribe(res => {
        // alert("User Added Successfully!");
        this._snackBar.openSnackBar('User Added Successfully!', 'Done');
        this._dialogRef.close(true);

      })
      }
      
    }
  }

}
