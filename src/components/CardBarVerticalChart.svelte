<script lang="ts">
  import { onMount } from "svelte";
  import type { MarketplacesPerformanceType } from "../types/markeplacesPerfomance";

  import { Chart, registerables } from "chart.js";

  Chart.register(...registerables);

  export let data: any;
  export let title: string
  export let filter: string
console.log(data)
  // init chart
  onMount(async () => {
    var config = {
      type: "bar",
      data: {
        labels: data.map(
          (key:  any) => key[filter]
        ),
        datasets: [
          {
            label: "Sales Value",
            tension: 0.4,
            backgroundColor: "#6e6ed7",
            borderColor: "#6e6ed7",
            data: data.map((key : any) => key.salesValueGross),
          },
          {
            label: "Items Sold",
            tension: 0.4,
            backgroundColor: "#f27b35",
            borderColor: "#f27b35",
            data: data.map((key : any) => key.itemsSold),
          },
          {
            label: "Order Count",
            tension: 0.4,
            backgroundColor: "#30c48d",
            borderColor: "#30c48d",
            data: data.map((key : any) => key.orders),
            hidden: true,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
            },
          },
          title: {
            display: true,
            text: title,
            align: "start",
            color: "black",
            font: {
              size: 20,
              family: "'Open Sans', sans-serif"
            },
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
        },
      },
    };
    var ctx = <HTMLCanvasElement>document.getElementById(filter)!;
    // @ts-ignore
    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words lg:w-[100%] mb-6 shadow-lg rounded-md bg-gray-100"
>
  <div class="p-5 flex-auto">
    <!-- Chart -->
    <div class="relative min-h-[350px]">
      <canvas id={filter} />
    </div>
  </div>
</div>
