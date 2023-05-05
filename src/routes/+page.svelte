<script lang="ts">
  import { page } from "$app/stores";
  import { Button, Chevron, Dropdown, DropdownItem } from "flowbite-svelte";

  import { onMount } from "svelte";

  import axios from "axios";
  // @ts-ignore
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  import CardStats from "../components/CardStats.svelte";
  import CardLineChart from "../components/CardLineChart.svelte";
  import CardChart from "../components/CardChart.svelte";

  import type { SalesByDateType } from "../types/salesByDate";
  import type { UserType } from "../types/user";
  import type { PerformanceBydateType } from "../types/performanceBydate";

  let search: string;
  let dateRange: string = "dtd";
  const baseUrl = "https://api-prod.tradepeg.com";

  $: dateRange, fetchDataSummary();

  let salesByDate: SalesByDateType;
  let user: UserType;
  let performanceByDate: PerformanceBydateType[];

  let salesPerformanceBydate: any;
  let grossPerformanceByDate: any;
  let soldItemPerformanceByDate: any;
  let orderCountPerformanceByDate: any;
  let channelsPerformance: any;

  let reportsByDate;
  let dateStartFormatted: string | string[];
  let dateEndFormatted: string | string[];
  let dateStart: string;
  let dateEnd: string;

  let loading: boolean = false;

  /*  onMount(async () => {
       const urlParams = new URLSearchParams(window.location.search);
    const isBeta = urlParams.has('apiKey');
 
    const API_KEY = $page.url.searchParams.get("apiKey");

    // hardcoded at the moment
    axios.defaults.headers.common["Authorization"] =
      "dG9rZW58eW5jOjI0OjNYMGdBZjlkWnBrSUJjUGJITHd4UktZak9scVZKVUc3NWhteXo0NnJlTU5pQ3NGdGF1MTJURVdvOHZuU1FEVmhlUDZ5QkdRT21jWDhaYnVMa0hSUzlLaUNXTTVucmdvRVlmbHQ0cElOYVQydmRKRlVqM3d6MXF4MERzN0F6UVVhZjZBdG5ZcHhpTTRxRzUzdks4ZUhtMVA5aHNSZGMwRlpCQ1hrREpOdVdvMmpUVmd3bE83eUlTRUxicmhkZ0ZwVTlsTmtNRXRYVHhXMEIyTGVmNEhWQ3FZWlNqS25zeVFpUGJvRHZSSnJ1T3dhN2N6OG1BNTZJM0cxWTFUZjBTOWs=";

    fetchDataSummary();
  })
 */
  const getApiKey = async () => {
    const API_KEY = $page.url.searchParams.get("apiKey");
    // hardcoded at the moment
    axios.defaults.headers.common["Authorization"] =
      "dG9rZW58eW5jOjI0OjNYMGdBZjlkWnBrSUJjUGJITHd4UktZak9scVZKVUc3NWhteXo0NnJlTU5pQ3NGdGF1MTJURVdvOHZuU1FEVmhlUDZ5QkdRT21jWDhaYnVMa0hSUzlLaUNXTTVucmdvRVlmbHQ0cElOYVQydmRKRlVqM3d6MXF4MERzN0F6UVVhZjZBdG5ZcHhpTTRxRzUzdks4ZUhtMVA5aHNSZGMwRlpCQ1hrREpOdVdvMmpUVmd3bE83eUlTRUxicmhkZ0ZwVTlsTmtNRXRYVHhXMEIyTGVmNEhWQ3FZWlNqS25zeVFpUGJvRHZSSnJ1T3dhN2N6OG1BNTZJM0cxWTFUZjBTOWs=";
  };

  const fetchUser = async () => {
    try {
      const resUser = await axios.get(baseUrl + "/user/self");
      user = resUser.data;
      /*       console.log(user); */
      /*     console.log("user:", user); */
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSummary = async () => {
    try {
      loading = true;
      if (!axios.defaults.headers.common["Authorization"]) {
        await getApiKey();
      }

      const resSalesByDate = await axios.get(
        baseUrl + "/reports/sales-overview/summary/" + dateRange
      );

      salesByDate = resSalesByDate.data;

      dateStart = salesByDate.dateRanges.range1.start;
      dateEnd = salesByDate.dateRanges.range1.end;

      //format data for ui
      dateStartFormatted = salesByDate.dateRanges.range1.start.split("-");
      dateStartFormatted =
        dateStartFormatted[2] +
        "/" +
        dateStartFormatted[1] +
        "/" +
        dateStartFormatted[0].substring(2);
      dateEndFormatted = salesByDate.dateRanges.range1.end.split("-");
      dateEndFormatted =
        dateEndFormatted[2] +
        "/" +
        dateEndFormatted[1] +
        "/" +
        dateEndFormatted[0].substring(2);

      const resPerformanceByDate = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/daily?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );

      performanceByDate = resPerformanceByDate.data.results;

      salesPerformanceBydate = performanceByDate.map(
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

      const resChannels = await axios.get(
        baseUrl +
          "/reports/sales-overview/performance/channels?start=" +
          dateStart +
          "&end=" +
          dateEnd
      );
      channelsPerformance = resChannels.data;

      loading = false;
      /*       console.log("salesByDate:", salesByDate); */
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="min-h-screen font-sans">
  <nav
    class="flex flex-col md:flex-row h-[13vh] md:h-[6vh] items-center justify-between px-1 py-3 bg-black bg-opacity-[85%]"
  >
    <div class="flex gap-5 items-center">
      <a class="  text-white text-3xl pl-3" href="/">TradePeg</a>
      <button
        class=" hidden md:block btn btn-link btn-sm text-white h-5 w-5"
        id="sidebarToggleTablet"
        ><svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 14 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="h-10 -mt-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div class="flex gap-2 items-center w-[98%]">
      <button
        class="md:hidden btn btn-link btn-sm text-white h-5 w-5"
        id="sidebarTogglePhone"
        ><svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 14 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="h-10 -mt-2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <form
        action=""
        class="relative ml-auto group min-w-180 sm:min-w-200 self-end"
      >
        <input
          bind:value={search}
          type="search"
          class="transition-all duration-1000 group-focus-within:w-[160px] xs:group-focus-within:w-[200px] focus:pl-10
           focus:ring-white focus:border-white focus-focus-within:cursor-text focus:white cursor-pointer relative z-10
           h-10 w-10 rounded-md border bg-transparent text-white outline-none search-cancel:appearance-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-y-0 h-10 w-10 border-r border-transparent text-white py-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>
      <!-- Navbar-->
      <Button
        class="!p-1.5 hover:bg-transparent bg-transparent focus:border-0 focus:!ring-0 focus:bg-transparent"
      >
        <Chevron>
          <div class="h-6">
            <FaUser />
          </div>
        </Chevron>
      </Button>
      <Dropdown class="w-[120px]">
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Activity Log</DropdownItem>
        <DropdownItem>Logout</DropdownItem>
      </Dropdown>
    </div>
  </nav>
  <div class="flex h-[87vh] md:h-[94vh]">
    <div class="pt-10 px-5 md:px-10 w-full">
      <div
        class="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between"
      >
        <h2 class="xs:hidden sm:block text-[30px] font-bold">DASHBOARD</h2>
        <div class="flex flex-col-reverse sm:flex-row items-center gap-10">
          <div class="flex flex-col items-center gap-1">
            <select
              bind:value={dateRange}
              id="countries"
              class="w-[170px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="dtd">Day to date</option>
              <option value="wtd">Week to date</option>
              <option value="mtd">Month to date</option>
              <option value="qtd">Quarter to date</option>
              <option value="ytd">Year to date</option>
            </select>
            {#await fetchDataSummary()}
              <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                <div
                  class="h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 w-[73px]"
                />
              </div>
            {:then _}
              <div class="flex items-center justify-between w-[170px]">
                {#if loading}
                  <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                    <div
                      class="h-[30px] bg-gray-200 rounded-md dark:bg-gray-700 w-[73px]"
                    />
                  </div>{:else}
                  <p
                    class=" bg-gray-50 border-gray-300 border-[1px] p-[2px] rounded-md"
                  >
                    {dateStartFormatted}
                  </p>{/if}

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
                {#if loading}
                  <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                    <div
                      class="h-[30px] bg-gray-200 rounded-md dark:bg-gray-700 w-[73px]"
                    />
                  </div>
                {:else}
                  <p
                    class=" bg-gray-50 border-gray-300 border-[1px] p-[2px] rounded-md"
                  >
                    {dateEndFormatted}
                  </p>{/if}
              </div>
            {/await}
          </div>
          {#await fetchUser()}
            <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
              <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-30" />
            </div>
          {:then _}
            <div class="flex items-center gap-3">
              <h2 class="hidden xs:block sm:hidden text-[20px] mr-10 font-bold">
                DASHBOARD
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
      <div class="flex gap-3 flex-wrap justify-center sm:justify-between mt-16">
        {#if loading}
          {#each { length: 4 } as _, i}
            <CardStats
              statTitle={null}
              result={null}
              previous={null}
              {dateRange}
            />
          {/each}
        {:else}
          <CardStats
            statTitle={"Sales Value"}
            result={salesByDate.results.salesValueGross}
            previous={salesByDate.previous.salesValueGross}
            {dateRange}
          />
          <CardStats
            statTitle={"Gross Profit"}
            result={salesByDate.results.grossProfit}
            previous={salesByDate.previous.grossProfit}
            {dateRange}
          />
          <CardStats
            statTitle={"Order Count"}
            result={salesByDate.results.orders}
            previous={salesByDate.previous.orders}
            {dateRange}
          />
          <CardStats
            statTitle={"Item Sold"}
            result={salesByDate.results.itemsSold}
            previous={salesByDate.previous.itemsSold}
            {dateRange}
          />
        {/if}
      </div>
      <div>
        <h3 class="font-bold text-2xl text-center mt-10">Daily Performance</h3>
        <div class="flex flex-col lg:flex-row mt-5 gap-5 lg:justify-between">
          {#if loading}
            <div role="status" class="space-y-2.5 animate-pulse">
              <div
                class="h-[400px] bg-gray-200 rounded-md dark:bg-gray-700 w-[280px] xs:w-[370px] md:w-[700px] lg:w-[460px] xl:w-[600px] 2xl:w-[750px]"
              />
            </div>
            <div role="status" class="space-y-2.5 animate-pulse">
              <div
                class="h-[400px] bg-gray-200 rounded-md dark:bg-gray-700 w-[280px] xs:w-[370px] md:w-[700px] lg:w-[460px] xl:w-[600px] 2xl:w-[750px]"
              />
            </div>
          {:else}
            <CardLineChart
              data1={salesPerformanceBydate}
              data2={grossPerformanceByDate}
              label1={"Sales Value"}
              label2={"Gross Profit"}
              color1={"#6e6ed7"}
              color2={"#30e3cb"}
              filter1={"salesValueGross"}
              filter2={"grossProfit"}
              chartId={"line-chart1"}
            />
            <CardLineChart
              data1={orderCountPerformanceByDate}
              data2={soldItemPerformanceByDate}
              label1={"Order Count"}
              label2={"Item Sold"}
              color1={"#30c48d"}
              color2={"#f27b35"}
              filter1={"orders"}
              filter2={"itemsSold"}
              chartId={"line-chart2"}
            />
          {/if}
        </div>
      </div>
      <div class="mt-5">
        <h3  class="font-bold text-2xl text-center mt-10">Channels Performance</h3>
        {#if loading}
          <div role="status" class="space-y-2.5 animate-pulse">
            <div
              class="h-[400px] bg-gray-200 rounded-md dark:bg-gray-700 w-[280px] xs:w-[370px] md:w-[700px] lg:w-[460px] xl:w-[600px] 2xl:w-[750px]"
            />
          </div>
        {:else}
          <CardChart data={channelsPerformance} />
        {/if}
      </div>
    </div>
  </div>
</div>
