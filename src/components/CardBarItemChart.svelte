<script lang="ts">
  import { onMount } from "svelte";
  import type { PerformanceByDateType } from "../types/performanceBydate";
  // library that creates chart objects in page
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  export let data1: PerformanceByDateType[];
  export let data2: PerformanceByDateType[];

  // init chart
  onMount(async () => {
    var config = {
      type: "bar",
      data: {
        labels: data1.map((key) => key.dateName),
        datasets: [
          {
            label: "Item Sold",
            tension: 0.4,
            backgroundColor: "#f27b35",
            borderColor: "#f27b35",
            // @ts-ignore
            data: data2.map((key) => key.itemsSold),
          },
          {
            label: "Order Count",
            tension: 0.4,
            backgroundColor: "#30c48d",
            borderColor: "#30c48d",
            // @ts-ignore
            data: data1.map((key) => key.orders),
          },
        ],
      },
      options: {
        responsive: true,

        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Order Performance",
            align: "start",
            color: 'black',
            font: {
              size: 20,
            },
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
        },
        scales: {
          y: {},
          x: {},
        },
      },
    };
    var ctx = <HTMLCanvasElement>document.getElementById('sold-chart')!;
    // @ts-ignore
    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words lg:w-[30%] mb-6 shadow-lg rounded-md bg-gray-100"
>
  <div class="p-5 flex-auto">
    <!-- Chart -->
    <div class="relative min-h-[350px]">
      <canvas id={'sold-chart'} />
    </div>
  </div>
</div>
