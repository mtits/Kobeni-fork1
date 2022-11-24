<template>
  <div>
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <div class="container mx-auto p-8">
          <NuxtPage />
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <!-- Sidebar content here -->
          <li><NuxtLink to="/">Home Page</NuxtLink></li>
          <li><NuxtLink to="/oppresultcodes">OPP Result Codes</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>
