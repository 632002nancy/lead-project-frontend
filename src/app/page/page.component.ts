import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadServiceService } from '../Service/lead-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Product {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  constructor(private router: Router,
   private leadData: LeadServiceService,
   private http:HttpClient){}

  @ViewChild('leadForm') form: NgForm;

  saved:boolean=false;
  selectedState:string='';
  selectedCity:string='';
  stateDis:boolean=true;
  cityDis:boolean=true;

  products: Product[] = [
    {value: 'Jio Saavan', viewValue: 'Jio Saavan'},
    {value: 'JioFiber', viewValue: 'JioFiber'},
    {value: 'Air Fiber', viewValue: 'Air Fiber'},
    {value: 'Jio Sim', viewValue: 'Jio Sim'},
    {value: 'Jio Fi', viewValue: 'Jio Fi'},
    {value: 'Jio Book', viewValue: 'Jio Book'},
    {value: 'Jio Bharat', viewValue: 'Jio Bharat'},
  ];


  postData(data: {fName:string,lName: string,mobile: number,address: string, pinCode: number,state: string, city:string, product:string, date:Date,time:TimeRanges}): void
  {
    console.log("form");
    console.log(this.form);
    console.log("post")
    this.leadData.postUsers(data).subscribe({
      next:(result)=>{
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Saved',
          text: 'Lead information has been successfully saved.',
          showConfirmButton: false,
          timer: 2000 // Close alert after 2 seconds
        });
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
    this.form.resetForm();
  }

  pinFetch(pin:any){
    let pincode = pin.toString();
    if(pincode.length!=6){
      console.log("Empty")
      this.stateDis=true;
      this.cityDis=true;
      this.selectedState='';
      this.selectedCity='';
    }
    console.log(pincode.length);
    if (pincode.length == 6) {
      console.log("here");
      pincode=parseInt(pincode);
      
        this.fetchCityAndState(pincode);
        console.log(pincode);
    }
  }
      
  async fetchCityAndState(pincode: any) {
    this.stateDis=false;
    this.cityDis=false;
    try {
      const response = await new Promise<any>((resolve, reject) => {
        this.leadData.getCity(pincode).subscribe({
          next: (data: any) => resolve(data),
          error: (error: any) => reject(error)
        });
      });
  
      console.log(response); // This will log the entire response object
      
      // Now you can access properties like city and state from the response
      const city = response.data.city;
      const state = response.data.state;
      
      console.log(city); // Log city
      console.log(state); // Log state

      this.selectedState=state;
      this.selectedCity=city;
    } catch (error) {
      console.error('Error fetching city:', error.error.msg);
      console.error('Error fetching city:', error.error.status);
      // Handle error appropriately
      if(error.error.status==false){
      this.selectedState="Not Found";
      this.selectedCity="Not Found";
      this.cityDis=true;
      this.stateDis=true;
      }
    }
    
  }
  
   displayResult(city:any, state:any) {
      const resultDiv = document.getElementById('result');
      console.log("city state");
      console.log(city);
      console.log(state);
  }


  leadcomponent(){
    console.log("clicked")
    this.router.navigate(['/leads']);
  }
}
