import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { Subject, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy{

    private destroy$ = new Subject<void>();
    public productsList: Array<GetAllProductsResponse> = [];
    public productsChartDatas!: ChartData;
    public productsChartOptions!: ChartOptions;

    constructor(private productService: ProductsService, private messageService: MessageService, private productsDtService: ProductsService){}


    ngOnInit(): void {
      this.getProductsDatas();
    }

  getProductsDatas() {
    this.productService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if (response.length > 0){
          this.productsList = response;
          console.log('DADOS DOS PRODUTOS', this.productsList);
          //this.productsDtService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produto!',
          life: 2500,
        }
    )}
    })
  }

  setProductsChartConfig(): void {
    if(this.productsList.length > 0){
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: this.productsList.map((element) => element?.amount)
          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend:{
            labels: {
              color: textColor
            }
          }
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font:{
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
            }
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            }
          }
        },
      };
  }
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
