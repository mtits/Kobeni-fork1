<template>
  <div>
    <!-- main div for drawer -->
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center">
        <!-- Page content here -->
        <div class="container mx-auto p-9">
          <NuxtPage />
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <!-- Sidebar content here -->
          <div class="mb-4">
            <article class="prose mb-1">
              <h3>Kobeni</h3>
            </article>

            <!-- items -->
            <li><NuxtLink to="/">Home</NuxtLink></li>
          </div>

          <div class="mb-4">
            <article class="prose mb-1">
              <h3>PAY.ON Stuffs</h3>
            </article>
            <!-- items -->
            <li><NuxtLink to="/copyandpay">CopyandPay</NuxtLink></li>
            <li><NuxtLink to="/oppresultcodes">OPP Result Codes</NuxtLink></li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
