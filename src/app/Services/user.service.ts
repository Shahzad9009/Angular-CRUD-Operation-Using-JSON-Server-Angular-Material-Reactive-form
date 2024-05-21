import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addUser(data:any)
  {
    return this._http.post('http://localhost:3000/users',data);
  }
  updateUser(id:number , data:any)
  {
    return this._http.put(`http://localhost:3000/users/${id}`,data);
  }
  
  GetUsers()
  {
    return this._http.get('http://localhost:3000/users');
  }
  deleteUser(id:number)
  {
    return this._http.delete(`http://localhost:3000/users/${id}`)
  }
}
