<script setup lang="ts">
import Navbar_1 from '@/components/Ui/Navbar_1.vue';
</script>

<template>
  <div class="bg-gray-100 text-gray-800 h-svh">
    <!-- Navbar -->
    
<Navbar_1/>
    <!-- Hero Section -->
    <section
      class="fondo flex flex-col items-center text-center justify-center py-40 px-6 h-auto bg-cover bg-center bg-no-repeat relative shadow-2xs text-white"

    >
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Controla tus gastos de forma fácil</h2>
        <p class="text-lg md:text-xl text-gray-200 mb-8 text-center">
          Con <span class="font-semibold text-indigo-300">CashTrack</span> puedes registrar,
          organizar y analizar tus finanzas de manera rápida y segura.
        </p>
        <RouterLink
          to="/Register"
          class="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Empieza Gratis
        </RouterLink>
      </div>
    </section>

    <!-- Features -->
    <section class="grid md:grid-cols-2 gap-6 px-6 md:px-20 py-12">
      <div
        class="bg-white shadow-md p-6 rounded-2xl text-center flex flex-col justify-center items-center gap-3 hover:scale-102 transition"
      >
        <h3 class="text-xl font-semibold mb-2">Registro Rápido</h3>
        <img src="@/assets/Registrar.png" alt="" class="w-15 text-center items-center" />
        <p class="text-gray-600">
          Añade tus ingresos y gastos en segundos, desde cualquier dispositivo.
        </p>
      </div>
      <div
        class="bg-white shadow-md p-6 rounded-2xl text-center flex flex-col justify-center items-center gap-3 hover:scale-102 transition"
      >
        <h3 class="text-xl font-semibold mb-2">Categorías Inteligentes</h3>
        <img
          src="@/assets/lista-de-verificacion.png"
          alt=""
          class="w-15 text-center items-center"
        />
        <p class="text-gray-600">
          Organiza tus finanzas por categorías para entender mejor tus hábitos.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-700 text-white text-center py-6 mt-12">
      <p>© 2025 CashTrack - Control de Gastos. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>



<style>
.fondo{
  background-image: url('@/assets/Fondo_Home.jpg');
}
</style>