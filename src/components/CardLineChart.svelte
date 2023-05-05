<script lang="ts">
  import { onMount } from "svelte";
  import type { PerformanceBydateType } from "../types/performanceBydate";
  // library that creates chart objects in page
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  export let data1: PerformanceBydateType[];
  export let data2: PerformanceBydateType[];
  export let label1: string;
  export let label2: string;
  export let color1: string;
  export let color2: string;
  export let filter1: string;
  export let filter2: string;
  export let chartId: string;

  // init chart
  onMount(async () => {
    var config = {
      type: "line",
      data: {
        labels: data1.map((key) => key.dateName),
        datasets: [
          {
            label: label2,
            tension: 0.4,
            backgroundColor: color2,
            borderColor: color2,
            // @ts-ignore
            data: data2.map((key) => key[filter2]),
          },
          {
            label: label1,
            tension: 0.4,
            backgroundColor: color1,
            borderColor: color1,
            // @ts-ignore
            data: data1.map((key) => key[filter1]),
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
            text: "Daily Performance",
       
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
        },
        scales: {
          y: {
        
          },
          x: {
            
          },
        },
      },
    };
    var ctx = <HTMLCanvasElement>document.getElementById(chartId)!;
    // @ts-ignore
    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words lg:w-[50%] mb-6 shadow-lg rounded-md bg-gray-100"
>
  <div class="p-5 flex-auto">
    <!-- Chart -->
    <div class="relative min-h-[350px]">
      <canvas id={chartId} />
    </div>
  </div>
</div>
