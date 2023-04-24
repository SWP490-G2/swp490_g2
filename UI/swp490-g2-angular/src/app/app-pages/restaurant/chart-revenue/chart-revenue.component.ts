import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  OrderClient,
  ReportIncomeOverTime,
  Restaurant,
  RestaurantClient,
} from "src/app/ngswag/client";

@Component({
  selector: "app-chart-revenue",
  templateUrl: "./chart-revenue.component.html",
  styleUrls: ["./chart-revenue.component.scss"],
})
export class ChartRevenueComponent implements OnInit {
  data: any;
  options: any;
  restaurant: Restaurant = new Restaurant();
  offset = 0;

  constructor(
    private $orderClient: OrderClient,
    private $router: Router,
    private $route: ActivatedRoute,
    private $restaurantClient: RestaurantClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.restaurant.id = id;
  }

  private initGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          label: "Sales",
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
          yAxisID: "y",
        },
        {
          type: "bar",
          label: "# of Orders",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: "white",
          borderWidth: 2,
          yAxisID: "y1",
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          position: "right",
        },
      },
    };
  }

  getWeekLabels(): string[] {
    const today = new Date();
    const days = [
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (6 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (5 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (4 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (3 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (2 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (1 + 7 * this.offset)),
      new Date(today.getTime() - 1000 * 60 * 60 * 24 * (0 + 7 * this.offset)),
    ];

    return days.map(
      (d) =>
        `${d.getFullYear()}-${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
    );
  }

  ngOnInit() {
    this.$restaurantClient
      .getById(this.restaurant.id!)
      .subscribe((restaurant) => (this.restaurant = restaurant));

    this.refreshGraph();
  }

  refreshGraph() {
    this.$orderClient
      .getReportIncomeOverTime(this.restaurant.id!, "WEEK", this.offset)
      .subscribe((results) => {
        this.initGraph();

        const newResults = this.getWeekLabels().map((label) => {
          const found = results.find((r) => r.label === label);
          return (
            found ||
            new ReportIncomeOverTime({
              label: label,
              totalOrders: 0,
              totalSales: 0,
            })
          );
        });

        this.data.labels = newResults.map((r) => r.label);
        this.data.datasets[0].data = newResults.map((r) => r.totalSales);
        this.data.datasets[1].data = newResults.map((r) => r.totalOrders);
      });
  }

  prev() {
    this.offset++;
    this.refreshGraph();
  }

  next() {
    this.offset--;
    this.refreshGraph();
  }
}
