<script lang="ts">
  export let dateRange: string;
  export let result: number | null;
  export let previous: number | null;
  export let statTitle: string | null;

  let percentage: string = "";

  if (result && previous) {
    if (result > previous) {
      percentage = (((result - previous) / previous) * 100).toFixed(2);
    } else {
      percentage = (((previous - result) / previous) * 100).toFixed(2);
    }
  }

  import FaChartLine from "svelte-icons/fa/FaChartLine.svelte";
  import FaPoundSign from "svelte-icons/fa/FaPoundSign.svelte";
  import FaChartBar from "svelte-icons/fa/FaChartBar.svelte";
</script>

<div
  class="relative flex flex-col justify-between min-w-0 w-[100%] sm:w-[340px] md:w-[340px] lg:w-[370px]  break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
  <div class="flex-auto p-3.5">
    <div class="flex flex-wrap items-center justify-between">
      {#if result}
        <div>
          <h5 class="text-blueGray-400 uppercase text-lg font-bold">
            {statTitle}
          </h5>
          <span class="font-semibold text-[30px] text-blueGray-700">
            £ {Math.round(result).toLocaleString()}
          </span>
        </div>
      {:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div
            class="h-16 bg-gray-200 rounded-md dark:bg-gray-700 w-[160px] mt-1.5"
          />
        </div>
      {/if}
      {#if result && previous}
        <div class="items-center text-xl flex">
          <span>
            {#if result / previous > 1}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="h-5 w-5 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            {:else}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="h-5 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            {/if}
          </span>
          <span
            class={result / previous > 1 ? "  text-green-500" : "text-red-600"}
          >
            {percentage}%</span
          >
        </div>
      {:else}<p />{/if}
    </div>
    <div class="flex text-sm lg:text-base text-blueGray-400 mt-2 items-end">
      {#if result && previous}
       
      
           

        <span
          class=" ml-1.5 xl:ml-0 xs:ml-2.5 text-[10px] xs:text-[13px] lg:text-[15px]"
        >
          {#if dateRange === "dtd"}
            Compared to yesterday
          {:else if dateRange === "wtd"}
            Compared to last week
          {:else if dateRange === "mtd"}
            Compared to last month
          {:else if dateRange === "qtd"}
            Compared to last quarter
          {:else if dateRange === "ytd"}
            Compared to last year
          {/if}</span
        >
        <div class=" w-auto pl-4 ml-auto text-center">
          <h6
            class="text-blueGray-400 uppercase font-semibold text-[10px] xs:text-sm lg:text-lg"
          >
            Previous
          </h6>
          <span class="font-semibold text-xs lg:text-base text-blueGray-700">
            £ {Math.round(previous).toLocaleString()}
          </span>
        </div>
      {:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div
            class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-[250px] sm:w-[280px]"
          />
        </div>
      {/if}
    </div>
  </div>
</div>
