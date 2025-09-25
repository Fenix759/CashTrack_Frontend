<template>
    <nav
      class="bg-blue-700 text-white px-6 py-4 flex items-center sm:justify-between shadow-2xl flex-wrap gap-3"
    >
      <RouterLink class="flex justify-center items-center gap-5 cursor-pointer " to="/">
        <img src="@/assets/salario.png" alt="" class="h-7" />
        <h1 class="text-2xl font-bold">CashTrack</h1>
      </RouterLink>
      <div class="flex gap-3 flex-wrap justify-center text-center">
        <RouterLink
          to="/Login"
          class="bg-gray-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-white transition"
          >Iniciar Sesión</RouterLink
        >
        <RouterLink
          to="/Register"
          class="text-white bg-blue-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
          >Registrarse</RouterLink
        >
      </div>
    </nav>
</template>