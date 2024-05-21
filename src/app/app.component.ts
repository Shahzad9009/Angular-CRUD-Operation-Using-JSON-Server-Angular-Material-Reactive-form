import { Component , Inject, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserService } from './Services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatSnakBarService } from './Services/mat-snak-bar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'USER-MANAGEMENT';
  displayedColumns: string[] = ['id', 'department','name', 'mobile', 'email', 'doj', 'gender', 'salary', 'usercode', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnakBarService,  private _dialog: MatDialog, private _userService: UserService) {}

  ngOnInit()
  {
    this.getUsersList();
  }
  getUsersList()
  {
    this._userService.GetUsers().subscribe((res:any) => {

      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteuser(id:number)
  {
    console.log(id)
    this._userService.deleteUser(id).subscribe(res => {
      // alert('User Deleted Successfully!');
      this._snackBar.openSnackBar('User Deleted Successfully!', 'Done');
      this.getUsersList();
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openUserForm()
  {
    const dialogRef =  this._dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.getUsersList();
      }
    })
  }

  openEditUserForm(data:any)
  {
    const dialogRef =  this._dialog.open(UserFormComponent , {
      data,
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.getUsersList();
      }
    })
  }
}
