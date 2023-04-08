import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  showTable2Index: number | null = null;
  showData(orderIndex: number) {
    if(orderIndex==this.showTable2Index){
      this.showTable2Index=null;
    }
   else{
    this.showTable2Index = orderIndex;
   }
  }


  orders:any;

  constructor(private authService:AuthService) {


  }

  ngOnInit(){

    this.authService.getOrders().subscribe(
      {
        next:(res)=>{
          this.orders=res.data.orders;
          console.log(this.orders);

        }
      }
    )

  }
}
