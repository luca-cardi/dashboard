<script lang="ts">
  import axios from "axios";
  import { page } from "$app/stores";
  import { Alert } from "flowbite-svelte";

  import CardItems from "../components/CardItems.svelte";
  import CardStats from "../components/CardStats.svelte";
  import CardLineChart from "../components/CardLineChart.svelte";
  import CardBarItemChart from "../components/CardBarItemChart.svelte";
  import CardBarVerticalChart from "../components/CardBarVerticalChart.svelte";

  import { DatePicker, DatePickerInput } from "carbon-components-svelte";
  import "carbon-components-svelte/css/white.css";

  //types
  import type { UserType } from "../types/user";
  import type { SalesByDateType } from "../types/salesByDate";
  import type { ItemsPerformanceType } from "../types/itemsPerformance";
  import type { PerformanceByDateType } from "../types/performanceByDate";

  import type { BarVerticalChartType } from "../types/barVerticalChart";

  import Cookies from "js-cookie";

  let dateRange: string = "mtd";
  const baseUrl = "https://api-prod.tradepeg.com";

  $: dateRange, fetchDataSummary(false);
  $: loadingError;

  let customDateStart: any;
  let customDateEnd: any;

  let user: UserType;
  let currencySymbol: string;
  let customDate: boolean = false;
  let salesByDate: SalesByDateType;
  let loadingError: boolean = false;
  let itemsPerformance: ItemsPerformanceType[];
  let performanceByDate: PerformanceByDateType[];
  let channelsPerformance: BarVerticalChartType[];
  let salesPerformanceByDate: PerformanceByDateType[];
  let grossPerformanceByDate: PerformanceByDateType[];
  let soldItemPerformanceByDate: PerformanceByDateType[];
  let orderCountPerformanceByDate: PerformanceByDateType[];
  let marketplacesPerformance: BarVerticalChartType[];
  let customersPerformance: BarVerticalChartType[];

  let dateEnd: string;
  let dateStart: string;
  let dateEndFormatted: string | string[];
  let dateStartFormatted: string | string[];

  let loadingCards: boolean = false;
  let loadingItems: boolean = false;
  let loadingMarketChannels: boolean = false;
  let loadingChartSalesChart: boolean = false;

  const getApiKey = async () => {
    let API_KEY: string | null;
    const cookie = Cookies.get("api_key_insights");
    API_KEY = $page.url.searchParams.get("apiKey");

    if (!API_KEY) {
      axios.defaults.headers.common["Authorization"] =
        Cookies.get("api_key_insights");
    } else {
      axios.defaults.headers.common["Authorization"] = API_KEY;
      Cookies.set("api_key_insights", API_KEY!);
    }

    const urlParams = new URLSearchParams(window.location.search);
    // Remove the API key parameter from the URL
    urlParams.delete("apiKey");
    const newUrl =
      window.location.origin + window.location.pathname + urlParams.toString();
    window.history.replaceState({}, "", newUrl);
  };
  const fetchUser = async () => {
    try {
      if (!axios.defaults.headers.common["Authorization"]) {
        await getApiKey();
      }
      const resUser = await axios.get(baseUrl + "/user/self");
      user = resUser.data;
      currencySymbol = user.organization.currencySymbol;
    } catch (error) {
      console.log(error);
    }
  };

  const formatCustomDate = (value: Date) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateUi = (value: string) => {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  const setRangeDate = (e: Date[]) => {
    customDateStart = formatCustomDate(e[0]);

    if (e.length > 1) {
      customDateEnd = formatCustomDate(e[1]);
    }
  };

  const fetchDataSummary = async (isCustom: boolean) => {
    if (dateRange === "custom" && !isCustom) {
      customDate = true;
      return;
    }

    try {
      customDate = false;
      loadingError = false;
      loadingChartSalesChart = true;
      loadingItems = true;
      loadingMarketChannels = true;
      loadingCards = true;

      if (!axios.defaults.headers.common["Authorization"]) {
        await getApiKey();
      }
      if (isCustom) {
        const resSalesByDate = await axios.get(
          baseUrl +
            "/reports/sales-overview/summary?start=" +
            customDateStart +
            "&end=" +
            customDateEnd
        );
        salesByDate = resSalesByDate.data;
        dateStart = customDateStart;
        dateEnd = customDateEnd;
        dateStartFormatted = formatDateUi(dateStart);
        dateEndFormatted = formatDateUi(dateEnd);
        /*         console.log("custom", dateEnd, dateStart);
        console.log(resSalesByDate); */
      } else {
        const resSalesByDate = await axios.get(
          baseUrl + "/reports/sales-overview/summary/" + dateRange
        );
        salesByDate = resSalesByDate.data;
        dateStart = salesByDate.dateRanges.range1.start;
        dateEnd = salesByDate.dateRanges.range1.end;
        /*    console.log("no custom", dateEnd, dateStart); */
        // format data for ui
        dateStartFormatted = formatDateUi(dateStart);
        dateEndFormatted = formatDateUi(dateEnd);
      }

      loadingCards = false;

      const resPerformanceByDate = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/daily?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );

      performanceByDate = resPerformanceByDate.data.results;

      salesPerformanceByDate = performanceByDate.map(
        ({ dateName, salesValueGross }) => ({ dateName, salesValueGross })
      );

      grossPerformanceByDate = performanceByDate.map(
        ({ dateName, grossProfit }) => ({ dateName, grossProfit })
      );

      soldItemPerformanceByDate = performanceByDate.map(
        ({ dateName, itemsSold }) => ({ dateName, itemsSold })
      );
      orderCountPerformanceByDate = performanceByDate.map(
        ({ dateName, orders }) => ({ dateName, orders })
      );

      loadingChartSalesChart = false;

      const resItems = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/items?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );

      itemsPerformance = resItems.data.results;

      loadingItems = false;

      const resChannels = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/channels?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );

      channelsPerformance = resChannels.data.results;

      const resCustomers = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/customers?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );

      customersPerformance = resCustomers.data.results;

      loadingMarketChannels = false;
    } catch (error) {
      loadingError = true;
      console.log(error);
    }
  };
</script>

<div class=" min-h-fit font-sans bg-gray-100">
  {#if loadingError}
    <Alert border color="red" class="flex justify-center">
      <span slot="icon"
        ><svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          /></svg
        >
      </span>
      <span class="font-medium"
        >Something went wrong whilst loading the dashboard!</span
      >
      try reload the page.
    </Alert>
  {/if}
  <div class="flex h-[87vh] md:h-[94vh]">
    <div class="pt-10 px-2 xs:px-5 md:px-10 w-full">
      <div
        class="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between"
      >
        <h2 class="xs:hidden sm:block text-[30px] font-semibold">Insights</h2>
        <div class="flex flex-col-reverse sm:flex-row items-center gap-10">
          <div class="flex flex-col items-center gap-1">
            <div>
              <div class="relative">
                <select
                  bind:value={dateRange}
                  disabled={loadingCards}
                  id="countries"
                  class="w-[170px] mt-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value="dtd">Day to date</option>
                  <option value="wtd">Week to date</option>
                  <option value="mtd">Month to date</option>
                  <option value="qtd">Quarter to date</option>
                  <option value="ytd">Year to date</option>
                  <option value="custom">Custom</option>
                </select>
                <label
                  for="disabled_outlined"
                  class="absolute text-sm text-gray-700 dark:text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >Date range</label
                >
              </div>
              {#if customDate}
                <div
                  class="z-20 bg-white border-black border-2 absolute p-3 top-[50px] right-[250px] flex flex-col items-center gap-3 rounded shadow-lg"
                >
                  <DatePicker
                    datePickerType="range"
                    dateFormat="d/m/y"
                    maxDate={new Date()}
                    on:change={(e) => {
                      // @ts-ignore
                      setRangeDate(e.detail.selectedDates);
                    }}
                  >
                    <DatePickerInput
                      labelText="Start date"
                      placeholder="dd/mm/yyyy"
                    />
                    <DatePickerInput
                      labelText="End date"
                      placeholder="dd/mm/yyyy"
                    />
                  </DatePicker>
                  <div class="flex gap-5">
                    <button
                      class="p-2"
                      on:click={() => {
                        customDate = false;
                        dateRange = "wtd";
                      }}>Cancel</button
                    >
                    <button class="p-2" on:click={() => fetchDataSummary(true)}
                      >Select</button
                    >
                  </div>
                </div>
              {/if}
            </div>
            {#await fetchDataSummary(false)}<p />{/await}
            <div class="flex items-center justify-between w-[160px]">
              {#if loadingCards}
                <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                  <div
                    class="h-[30px] bg-gray-200 rounded-md dark:bg-gray-700 w-[160px]"
                  />
                </div>
              {:else}
                <p>
                  {dateStartFormatted}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
                <p>
                  {dateEndFormatted}
                </p>
              {/if}
            </div>
          </div>
          {#await fetchUser()}
            <div role="status" class=" animate-pulse max-w-lg">
              <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-30" />
            </div>
          {:then _}
            <div class="flex items-center gap-3">
              <h2
                class="hidden xs:block sm:hidden text-[20px] mr-10 font-semibold"
              >
                Insights
              </h2>
              <div>
                <p class="font-bold text-lg text-center">
                  {user.organization.name}
                </p>
                <p class="text-sm text-center">{user.name}</p>
              </div>
              <img class="h-16" src={user.organization.logo} alt="logo" />
            </div>
          {/await}
        </div>
      </div>
      <div
        class="flex gap-2.5 flex-wrap lg:flex-nowrap justify-center sm:justify-between mt-16"
      >
        {#if loadingCards}
          {#each { length: 4 } as _, i}
            <CardStats
              statTitle={null}
              result={null}
              previous={null}
              currencySymbol={""}
              {dateRange}
            />
          {/each}
        {:else}
          <CardStats
            statTitle={"Sales Value"}
            result={salesByDate.results.salesValueGross}
            previous={salesByDate.previous?.salesValueGross}
            {currencySymbol}
            {dateRange}
          />
          <CardStats
            statTitle={"Gross Profit"}
            result={salesByDate.results.grossProfit}
            previous={salesByDate.previous?.grossProfit}
            {currencySymbol}
            {dateRange}
          />
          <CardStats
            statTitle={"Orders Count"}
            result={salesByDate.results.orders}
            previous={salesByDate.previous?.orders}
            {currencySymbol}
            {dateRange}
          />
          <CardStats
            statTitle={"Items Sold"}
            result={salesByDate.results.itemsSold}
            previous={salesByDate.previous?.itemsSold}
            {currencySymbol}
            {dateRange}
          />
        {/if}
      </div>
      <div>
        <div
          class="flex flex-col lg:flex-row gap-12 lg:gap-5 justify-center lg:justify-between mt-12"
        >
          {#if loadingChartSalesChart}
            <div role="status" class=" animate-pulse">
              <div
                class="h-[400px] bg-gray-200 rounded-md dark:bg-gray-700 w-[92vw] lg:w-[65.5vw]"
              />
            </div>
            <div role="status" class=" animate-pulse">
              <div
                class="h-[400px] bg-gray-200 rounded-md dark:bg-gray-700 w-[92vw] lg:w-[27.5vw]"
              />
            </div>
          {:else}
            <CardLineChart
              data1={salesPerformanceByDate}
              data2={grossPerformanceByDate}
            />
            <CardBarItemChart
              data1={orderCountPerformanceByDate}
              data2={soldItemPerformanceByDate}
            />
          {/if}
        </div>
      </div>
      <div class="flex mt-12">
        {#if loadingItems}
          <div role="status" class=" animate-pulse">
            <div
              class="h-[550px] bg-gray-200 rounded-md dark:bg-gray-700 w-[92vw] lg:w-[94.5vw]"
            />
          </div>
        {:else}
          <CardItems tableData={itemsPerformance} {currencySymbol} />{/if}
      </div>
      <div
        class="flex flex-col lg:flex-row my-12 gap-5 justify-center lg:justify-between"
      >
        {#if loadingMarketChannels}
          <div role="status" class=" animate-pulse">
            <div
              class="h-[300px] bg-gray-200 rounded-md dark:bg-gray-700 w-[92vw] lg:w-[46.7vw]"
            />
          </div>
          <div role="status" class=" animate-pulse">
            <div
              class="h-[300px] bg-gray-200 rounded-md dark:bg-gray-700 w-[92vw] lg:w-[46.7vw]"
            />
          </div>
        {:else}
          <CardBarVerticalChart
            data={customersPerformance}
            title={"Top Customers"}
            filter={"name"}
          />
          <CardBarVerticalChart
            data={channelsPerformance}
            title={"Top Channels"}
            filter={"channelName"}
          />
        {/if}
      </div>
      <footer class="py-4 bg-light mt-auto">
        <div class="px-4">
          <div class="flex items-center justify-center text-sm">
            <div class="">Copyright &copy; TradePeg 2023</div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
