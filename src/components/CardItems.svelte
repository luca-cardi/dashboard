<script lang="ts">
  import type { ItemsPerformanceType } from "../types/itemsPerformance";
  export let tableData: ItemsPerformanceType[];
  export let currencySymbol: string;

  let sortValue: string = "salesValueGross";
  const sort = () => {
    tableData = tableData.sort((a, b) =>
      a[sortValue as keyof ItemsPerformanceType] <
      b[sortValue as keyof ItemsPerformanceType]
        ? 1
        : b[sortValue as keyof ItemsPerformanceType] <
          a[sortValue as keyof ItemsPerformanceType]
        ? -1
        : 0
    );
  };

  $: sortValue, sort();
</script>

<div class="p-5 bg-white rounded shadow-lg w-full">
  <div class="flex justify-between items-center mb-6">
    <h4 class="font-bold text-[20px]">Top Items</h4>
    <select
      bind:value={sortValue}
      id="countries"
      class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="salesValueGross">By Sales</option>
      <option value="itemsSold">By Sold Items</option>
    </select>
  </div>

  <table class=" w-full table-sort table-arrows">
    <thead>
      <tr class="text-left bg-gray-200">
        <th class="pl-1">SKU</th>
        <th class="min-w-[60px] hidden sm:block border-separate py-3">Title</th>
        <th class=" pr-4 text-right">Sales Value</th>
        <th class="pr-2 text-right">Items Sold</th>
      </tr></thead
    >
    <tbody class=" [&>*:nth-child(even)]:bg-gray-100">
      {#each tableData as data, i}
        <tr>
          <td class="pr-4 pl-1">
            <div class="flex gap-2">
              {data.itemSku}
            </div>
          </td>
          <td class=" pr-10 hidden sm:block py-3">
            <div class="flex gap-2">
              <p
                class="max-w-[300px] md:max-w-[250px] lg:max-w-[550px] xl:max-w-[800px] overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
                {data.itemTitle}
              </p>
            </div>
          </td>

          <td class=" pr-4 text-right"
            >{currencySymbol} {Math.round(data.salesValueGross).toLocaleString()}
          </td>
          <td class=" pr-2 text-right">{data.itemsSold.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
