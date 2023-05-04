<script lang="ts">
  // core components
  import {
    CardPlaceholder,
    ImagePlaceholder,
    ListPlaceholder,
    Skeleton,
    TestimonialPlaceholder,
    TextPlaceholder,
    VideoPlaceholder,
    WidgetPlaceholder,
  } from "flowbite-svelte";

  export let statTitle: string | null;
  export let result: number | null;
  export let previous: number | null;
  export let dateRange: string;
  console.log(result, previous, dateRange);

  import FaChartLine from "svelte-icons/fa/FaChartLine.svelte"; // profit
  import FaPoundSign from "svelte-icons/fa/FaPoundSign.svelte"; // sales
  import FaChartBar from "svelte-icons/fa/FaChartBar.svelte"; //item sold order

  // The value must match one of these strings
  // "up" or "down"
  export let statArrow = "up";
  export let statPercent = "3.48";
  // can be any of the text color utilities
  // from tailwindcss
  export let statPercentColor = "text-emerald-500";
  export let statDescripiron = "Since last month";
  export let statIconName = "far fa-chart-bar";
  // can be any of the background color utilities
  // from tailwindcss
  export let statIconColor = "bg-red-500";
</script>

<div
  class="relative flex flex-col justify-between min-w-0 w-[300px] sm:w-[340px] md:w-[320px] h-[150px] break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
  <div class="flex-auto p-4">
    <div class="flex flex-wrap">
      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
        {#if result}
          <h5 class="text-blueGray-400 uppercase font-bold text-sm">
            {statTitle}
          </h5>
          <span class="font-semibold text-2xl text-blueGray-700">
            {#if statTitle === "Sales Value" || statTitle === "Gross Profit"}
              £ {result}
            {:else}
              {result}
            {/if}
          </span>
        {:else}
          <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div
              class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-1.5"
            />
          </div>
        {/if}
      </div>
      <div class="relativepl-4 flex-initial">
        {#if statTitle === "Sales Value"}
          <div
            class="bg-green-500 rounded-full p-3 text-xs text-white w-12 h-12"
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
          {((previous / result) * 100).toFixed(2)}%</span
        >
        <span class=" ml-4">
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
          <h6 class="text-blueGray-400 uppercase font-bold text-xs">
            Previous
          </h6>
          <span class="font-semibolzd text-md text-blueGray-700">
            {#if statTitle === "Sales Value" || statTitle === "Gross Profit"}
              £{previous}
            {:else}
              {previous}
            {/if}
          </span>
        </div>
      {:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div
            class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mt-2"
          />
        </div>
      {/if}
    </div>
  </div>
</div>
