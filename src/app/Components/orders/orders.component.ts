import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'date', 'state', 'delete'];

  dataSource: any;
  isLoading = false;

  constructor(public orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.isLoading = true;

    this.orderService.getAllOrders().subscribe((res: any) => {
      console.log(res);
      // this.dataSource = res.data;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  cancelOrder(orderId: any) {
    this.isLoading = true;
    this.orderService.cancelOrder(orderId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.getOrders();
        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled Successfully',
          showConfirmButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }

  acceptOrder(orderId: any) {
    this.isLoading = true;
    this.orderService.acceptOrder(orderId).subscribe({
      next: (res: any) => {
        console.log(res);
        // this.isAccepted = true;
        this.isLoading = false;
        this.getOrders();
        Swal.fire({
          icon: 'success',
          title: 'Order Accepted Successfully',
          showConfirmButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }
}
