<script lang="ts">
  import { onMount } from "svelte";
  import type { PerformanceByDateType } from "../types/performanceByDate";

  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  export let data1: PerformanceByDateType[];
  export let data2: PerformanceByDateType[];

  onMount(async () => {
    var config = {
      type: "line",
      data: {
        labels: data1.map((key) => key.dateName),
        datasets: [
          {
            label: "Gross Profit",
            tension: 0.4,
            backgroundColor: "#30e3cb",
            borderColor: "#30e3cb",
            data: data2.map((key) => key.grossProfit),
          },
          {
            label: "Sales Value",
            tension: 0.4,
            backgroundColor: "#6e6ed7",
            borderColor: "#6e6ed7",
            data: data1.map((key) => key.salesValueGross),
          },
        ],
      },
      options: {
        responsive: true,
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
            text: "Sales Insights",
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
    var ctx = <HTMLCanvasElement>document.getElementById("sales-chart")!;
    // @ts-ignore
    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words lg:w-[70%] mb-6 shadow-lg rounded-md bg-white "
>
  <div class="p-5 flex-auto">
    <!-- Chart -->
    <div class="relative min-h-[350px]">
      <canvas id={"sales-chart"} />
    </div>
  </div>
</div>
