<script lang="ts">
  export let tableData: any;
  console.log(tableData);
</script>

<div class="p-5 bg-white rounded shadow-lg">
  <h4 class="font-bold text-[20px]">Items Sold</h4>
  <table class=" border-separate border-spacing-y-4 w-full">
    <thead >
      <tr class="text-left bg-gray-100 ">
        <th class="min-w-[60px] hidden sm:block  border-separate py-3">Title</th>
        <th >SKU</th>
        <th >Sales</th>
        <th>Sold</th>
      </tr></thead
    >
    <tbody class="mt-10">
      {#each tableData as data}
        <tr>
          <td
            class="max-w-[300px] md:max-w-[350px] lg:max-w-[550px] xl:max-w-[800px] overflow-hidden whitespace-nowrap overflow-ellipsis pr-10 hidden sm:block"
            >{data.itemTitle}</td
          >
          <td class="pr-4 xs:pr-10">{data.itemSKU}</td>
          <td class=" pr-4 xs:pr-10">£{data.salesValueGross}</td>
          <td class="">{data.itemsSold}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
