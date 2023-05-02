<script lang="ts">
	
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";
  import FaAlignJustify from "svelte-icons/fa/FaAlignJustify.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  let search: string;

</script>

<nav class="flex items-center justify-between p-4 bg-black bg-opacity-85">
  <div class="flex gap-5 items-center">
    <a class=" text-white text-3xl pl-3" href="/">TradePeg</a>
    <button
      class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 text-white h-5"
      id="sidebarToggle"><FaAlignJustify /></button
    >
  </div>
  <div class="flex gap-8">
    <form action="" class="relative mx-auto group min-w-200">
      <input
        bind:value={search}
        type="search"
        class="transition-all duration-1000 group-focus-within:w-[200px] focus:px-12 focus:ring-white focus:border-white focus-focus-within:cursor-text focus:white cursor-pointer relative z-10 h-10 w-10 rounded-md border bg-transparent text-white outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute ] inset-y-0 h-10 w-10 border-r border-transparent text-white py-1.5"
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
    <Button class="px-0.5 focus:ring-0 focus:bg-transparent"><Chevron><div class="h-5 w"><FaUser /></div></Chevron></Button>
    <Dropdown>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Activity Log</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  </div>
</nav>
