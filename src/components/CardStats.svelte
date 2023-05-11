<script lang="ts">
  export let currencySymbol: string;
  export let dateRange: string;
  export let result: number | null;
  export let previous: number | null;
  export let statTitle: string | null;

  let percentage: number;

  if (result && previous) {
    if (result > previous) {
      percentage = Math.round(((result - previous) / previous) * 100);
    } else {
      percentage = Math.round(((previous - result) / previous) * 100);
    }
  }

  import FaChartLine from "svelte-icons/fa/FaChartLine.svelte";
  import FaPoundSign from "svelte-icons/fa/FaPoundSign.svelte";
  import FaChartBar from "svelte-icons/fa/FaChartBar.svelte";
</script>

<div
  class="relative flex flex-col justify-between min-w-0 w-[90%] sm:w-[300px] lg:w-[220px] xl:w-[330px] break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
  <div class="flex flex-col items-center p-3.5 gap-3">
    <div class=" self-start">
      {#if statTitle}
        <h5 class="text-blueGray-400 text-lg font-semibold text-gray-500">
          {statTitle}
        </h5>{:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-[100px]" />
        </div>{/if}
    </div>
    {#if result}
      <div class=" self-center justify-self-center max-w-fit">
        <span class="font-semibold text-[35px] lg:text-[50px] text-blueGray-700">
          {#if statTitle === "Sales Value" || statTitle === "Gross Profit"}
           {currencySymbol}
          {/if}
          {Math.round(result).toLocaleString()}
        </span>
      </div>
    {:else}
      <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
        <div
          class="h-14 bg-gray-200 rounded-md dark:bg-gray-700 w-[200px] mt-1.5"
        />
      </div>
    {/if}

    <div class="flex  text-blueGray-400 mt-2 items-end">
      {#if result && previous}
        <div class="items-center text-xl flex mr-4">
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
      {:else}
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg mt-2">
          <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-[80px]" />
        </div>{/if}
    </div>
    {#if result && previous}
      <div class="-mt-2">
        <span class=" text-[15px]">
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
      </div>
    {:else}
      <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
        <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px]" />
      </div>
    {/if}
  </div>
</div>
