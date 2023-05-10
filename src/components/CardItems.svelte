<script lang="ts">
  import type { ItemsPerformanceType } from "../types/itemsPerformance";
  export let tableData: ItemsPerformanceType[];
  import FaMedal from "svelte-icons/fa/FaMedal.svelte";
  import GiLaurelsTrophy from "svelte-icons/gi/GiLaurelsTrophy.svelte";
  import GiTrophy from "svelte-icons/gi/GiTrophy.svelte";
  import GiTrophyCup from "svelte-icons/gi/GiTrophyCup.svelte";

  let filterValue: string = "salesValueGross";
  const filter = () => {
    tableData = tableData.sort((a, b) =>
      a[filterValue as keyof ItemsPerformanceType] <
      b[filterValue as keyof ItemsPerformanceType]
        ? 1
        : b[filterValue as keyof ItemsPerformanceType] <
          a[filterValue as keyof ItemsPerformanceType]
        ? -1
        : 0
    );
  };

  $: filterValue, filter();
</script>

<div class="p-5 bg-white rounded shadow-lg w-full">
  <div class="flex justify-between items-center mb-6">
    <h4 class="font-bold text-[20px]">Top Performing Items</h4>
    <select
      bind:value={filterValue}
      id="countries"
      class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="salesValueGross">By Sales</option>
      <option value="itemsSold">By Sold</option>
    </select>
  </div>

  <table class=" w-full">
    <thead>
      <tr class="text-left bg-gray-200">
        <th class="min-w-[60px] hidden sm:block border-separate py-3 pl-1"
          >Title</th
        >
        <th>SKU</th>
        <th class=" pr-4 text-right">Sales Value</th>
        <th class="pr-2 text-right">Items Sold</th>
      </tr></thead
    >
    <tbody class=" [&>*:nth-child(even)]:bg-gray-100">
      {#each tableData as data, i}
        <tr>
          <td class="pl-1 pr-10 hidden sm:block py-3">
            <div class="flex gap-2">
              {#if i == 0}
                <p class="hidden sm:block !w-[30px] text-[#d4af37]">
                  <GiTrophyCup />
                </p>
              {:else}<p class="hidden sm:block !w-[30px] text-[#C0C0C0]" />{/if}
              <p
                class="max-w-[300px] md:max-w-[250px] lg:max-w-[550px] xl:max-w-[800px] overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
                {data.itemTitle}
              </p>
            </div>
          </td>
          <td class="pr-4">
            <div class="flex gap-2">
              {#if i == 0}<p class="sm:hidden !w-[20px] text-[#d4af37]">
                  <FaMedal />
                </p>{:else if i == 1}<p
                  class="sm:hidden !w-[20px] text-[#cd7f32]"
                >
                  <FaMedal />
                </p>{:else if i === 2}<p
                  class="sm:hidden !w-[20px] text-[#C0C0C0]"
                >
                  <FaMedal />
                </p>{:else}<p
                  class="sm:hidden !w-[20px] text-[#C0C0C0]"
                />{/if}{data.itemSKU}
            </div>
          </td>
          <td class=" pr-4 text-right"
            >£ {Math.round(data.salesValueGross).toLocaleString()}
          </td>
          <td class=" pr-2 text-right">{data.itemsSold.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
