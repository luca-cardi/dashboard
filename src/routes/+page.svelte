<script lang="ts">
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";
  // @ts-ignore
  import FaAlignJustify from "svelte-icons/fa/FaAlignJustify.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  let search: string;
</script>

<div class='min-h-screen'>
  <nav class="flex flex-col md:flex-row gap-5 items-center justify-between px-1 py-3 bg-black bg-opacity-80">
    <div class="flex gap-5 items-center">
      <a class=" text-white text-3xl pl-3" href="/">TradePeg</a>
      <button
        class=" hidden md:block  btn btn-link btn-sm text-white h-5  w-5"
        id="sidebarToggleTablet"><FaAlignJustify />
      </button>
    </div>
    <div class="flex gap-2 self-end items-center w-[98%]">
      <button
      class="md:hidden btn btn-link btn-sm text-white h-5 w-5"
      id="sidebarTogglePhone"><FaAlignJustify />
    </button>
      <form action="" class="relative ml-auto group min-w-180 sm:min-w-200 self-end">
        <input
          bind:value={search}
          type="search"
          class="transition-all duration-1000 group-focus-within:w-[160px] xs:group-focus-within:w-[200px] focus:pl-10 focus:ring-white focus:border-white focus-focus-within:cursor-text focus:white cursor-pointer relative z-10 h-10 w-10 rounded-md border bg-transparent text-white outline-none"
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
        class="px-0.5 hover:bg-transparent bg-transparent focus:border-0 focus:!ring-0 focus:bg-transparent">
        <Chevron>
          <div class="h-5 w">
            <FaUser />
          </div>
        </Chevron>
      </Button>
      <Dropdown class='w-[120px]'>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Activity Log</DropdownItem>
        <DropdownItem>Logout</DropdownItem>
      </Dropdown>
    </div>
  </nav>
  <div class="flex h-[93.4vh]">  <nav class=" md:w-[25%] lg:w-[11%] h-full bg-black bg-opacity-80"></nav><div></div></div>

</div>
