import { Component,ViewChild,ElementRef } from '@angular/core';
import { GroceriesService } from '../groceries.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  @ViewChild('search')
  searchInput!: ElementRef;

  myValue: any;

  onSubmit(event:Event) {
    event.preventDefault();
    const inputValue =this.myValue;
    if(inputValue){
      this.router.navigate(['search-groceries',inputValue])
    }

  }
  categories:string[]=['']
  constructor(private groceriesService:GroceriesService , private router:Router){}

  ngOnInit(){
    this.categories=this.groceriesService.getCategories();
  }


}
