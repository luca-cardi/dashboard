<script lang="ts">

  export let statTitle: string | null;
  export let result: number | null;
  export let previous: number | null;
  export let dateRange: string;

  let percentage: string = "";

  if (result && previous) {
    if (result > previous) {
      percentage = (((result - previous) / previous) * 100).toFixed(2);
    } else {
      percentage = (((previous - result) / previous) * 100).toFixed(2);
    }
  }

  import FaChartLine from "svelte-icons/fa/FaChartLine.svelte"; // profit
  import FaPoundSign from "svelte-icons/fa/FaPoundSign.svelte"; // sales
  import FaChartBar from "svelte-icons/fa/FaChartBar.svelte";   // item sold order

</script>

<div
  class="relative flex flex-col justify-between min-w-0 w-[100%] xs:w-[90%] sm:w-[340px] md:w-[330px] h-[150px] break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
  <div class="flex-auto p-4">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
        {#if result}
          <h5 class="text-blueGray-400 uppercase font-bold text-sm">
            {statTitle}
          </h5>
          <span class="font-semibold text-2xl text-blueGray-700">
            {#if statTitle === "Sales Value" || statTitle === "Gross Profit"}
              £ {result.toLocaleString()}
            {:else}
              {result}
            {/if}
          </span>
        {:else}
          <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div
              class="h-16 bg-gray-200 rounded-md dark:bg-gray-700 w-[160px] mt-1.5"
            />
          </div>
        {/if}
      </div>
      <div class="relative pl-4 flex-initial">
        {#if statTitle === "Sales Value"}
          <div
            class="bg-green-400 rounded-full p-3 text-xs text-white w-12 h-12"
          >
            <FaPoundSign />
          </div>
        {:else if statTitle === "Order Count"}
          <div
            class=" bg-pink-500 rounded-full p-3 text-xs text-white w-12 h-12"
          >
            <FaChartBar />
          </div>
        {:else if statTitle === "Item Sold"}
          <div
            class="bg-orange-500 rounded-full p-3 text-xs text-white w-12 h-12"
          >
            <FaChartBar />
          </div>
        {:else if statTitle === "Gross Profit"}
          <div class="bg-red-500 rounded-full p-3 text-xs text-white w-12 h-12">
            <FaChartLine />
          </div>{:else}
          <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div
              class="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mt-1.5"
            />
          </div>{/if}
      </div>
    </div>
    <div class="flex text-sm text-blueGray-400 mt-8 items-center">
      {#if result && previous}
        <span class=" {result}">
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
          class={result / previous > 1 ? " text-green-500" : "text-red-600"}
        >
          {percentage}%</span
        >
        <span class=" ml-2.5">
          {#if dateRange === "dtd"}
            Since yesterday
          {:else if dateRange === "wtd"}
            Since last week
          {:else if dateRange === "mtd"}
            Since last month
          {:else if dateRange === "qtd"}
            Since last quarter
          {:else if dateRange === "ytd"}
            Since last year
          {/if}</span
        >

        <div class="relative w-auto pl-4 flex-initial ml-auto text-center">
          <h6 class="text-blueGray-400 uppercase font-bold text-[12px]">
            Previous
          </h6>
          <span class="font-semibolzd text-sm text-blueGray-700">
            {#if statTitle === "Sales Value" || statTitle === "Gross Profit"}
              £{previous.toLocaleString()}
            {:else}
              {previous}
            {/if}
          </span>
        </div>
      {:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div
            class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-[300px] "
          />
        </div>
      {/if}
    </div>
  </div>
</div>
