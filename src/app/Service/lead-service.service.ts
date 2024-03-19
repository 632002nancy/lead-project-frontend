import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface leads{
  fName:string,
  lName: string,
  mobile: number,
  address: string, 
  pinCode: number,
  state: string, 
  city:string, 
  product:string, 
  date:Date, 
  time:TimeRanges,
  // id?:string
}

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {

  constructor(private http:HttpClient){ }
  getUsers(){
    return this.http.get('https://lead-project-backend-1.onrender.com');
  }
  getCity(pincode:any){
    return this.http.get(`https://lead-project-backend-1.onrender.com/getcity/${pincode}`);
  }

  postUsers(data:leads){
    return this.http.post('https://lead-project-backend-1.onrender.com',data);
  }
}
