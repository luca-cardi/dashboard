<script lang="ts">
  import { onMount } from "svelte";
  import type { PerformanceBydateType } from "../types/performanceBydate";
  // library that creates chart objects in page
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  export let data: any;

  // init chart
  onMount(async () => {
    var config = {
      type: "bar",
      data: {
        labels: data.results.map((key) => key.channelName),
        datasets:[ {
          label: "Sales",
          tension: 0.4,
          backgroundColor: "rgb(110 110 215)",
          borderColor: "rgb(110 110 215)",
          // @ts-ignore
          data: data.results.map((key) => key.salesValueGross),
        },{
          label: "Sold",
          tension: 0.4,
          backgroundColor: "rgb(242 123 53 )",
          borderColor: "rgb(242 123 53)",
          // @ts-ignore
          data: data.results.map((key) => key.itemsSold),
        }],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Channels Performance",
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
    var ctx = <HTMLCanvasElement>document.getElementById("bar-chart")!;
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
      <canvas id="bar-chart" />
    </div>
  </div>
</div>
