<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Navbar_1 />

    <section class="flex flex-col items-center justify-center flex-grow px-6">
      <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Crear Cuenta</h2>

        <!-- Paso 1: Registro -->
        <div v-if="step === 1">
          <label class="block mb-2 font-medium">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            class="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label class="block mb-2 font-medium">Correo Electrónico</label>
          <input
            v-model="correo"
            type="email"
            class="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            @click="register"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition mb-4"
          >
            Registrarse
          </button>

          <p class="text-center text-gray-600">
            ¿Ya tienes cuenta?
            <RouterLink to="/login" class="text-blue-600 font-semibold hover:underline">
              Inicia sesión
            </RouterLink>
          </p>
        </div>

        <!-- Paso 2: Verificación OTP -->
        <div v-else>
          <p class="mb-3 text-gray-700">Se envió un OTP a {{ correo }}</p>
          <input
            v-model="otp"
            type="text"
            maxlength="6"
            class="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Ingresa tu OTP"
          />
          <button
            @click="verifyOtp"
            class="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Verificar OTP
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar_1 from "@/components/Ui/Navbar_1.vue";
import api from "../api";

export default {
  components: { Navbar_1 },
  data() {
    return {
      nombre: "",
      correo: "",
      otp: "",
      step: 1,
    };
  },
  methods: {
    async register() {
      try {
        await api.post("/register/", {
          correo: this.correo,
          nombre: this.nombre,
        });
        this.step = 2;
      } catch (err) {
        alert(err.response?.data?.error || "Error en registro");
      }
    },
    async verifyOtp() {
      try {
        await api.post("/verify-register/", {
          correo: this.correo,
          otp: this.otp,
        });
        alert("Registro exitoso, ahora puede iniciar sesión");
        this.$router.push("/login");
      } catch (err) {
        alert(err.response?.data?.error || "Error verificando OTP");
      }
    },
  },
};
</script>
