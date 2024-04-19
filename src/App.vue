<template>
  <div h-screen overflow-hidden flex="~ col" px4 py6 lg:px14 lg:py10>
    <Navbar />
    <div h-full overflow-overlay flex="auto">
      <RouterView />
    </div>
  </div>
</template>
