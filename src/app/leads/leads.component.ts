import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadServiceService } from '../Service/lead-service.service';
import { map } from 'rxjs/operators';

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

interface Product {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent {
  constructor(private http:HttpClient,
    private leadData:LeadServiceService){}

    allLeads:leads[]=[]
    leadsData: leads[]=[];
    selectedValue:string;
    display:boolean=false;

    products: Product[] = [
      {value: 'Jio Saavan', viewValue: 'Jio Saavan'},
      {value: 'JioFiber', viewValue: 'JioFiber'},
      {value: 'Air Fiber', viewValue: 'Air Fiber'},
      {value: 'Jio Sim', viewValue: 'Jio Phone'},
      {value: 'Jio Fi', viewValue: 'Jio Fi'},
      {value: 'Jio Book', viewValue: 'Jio Book'},
      {value: 'Jio Bharat', viewValue: 'Jio Bharat'},
    ];

    // onSelectChange(): void {
    //   console.log(this.selectedValue); // Output the selected value
    // }

    onSelectChange(): void {
    this.display=true;
    console.log("here")
    this.leadData.getUsers().pipe(map((res) => {
      const leads = [];
      for (const key in res) {   //by doing this our properties are getting stored into the array
        leads.push(...res[key]) //spreading the properties in key to an individual rpoperty for leads array
      }
      return leads.filter(i=>i.product==this.selectedValue);
      
    }))
      .subscribe((res) => {
        this.allLeads = res;
        this.leadsData=this.allLeads;
        return this.leadsData
      });
  }
}
