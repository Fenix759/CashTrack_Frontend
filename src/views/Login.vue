<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Navbar_1 />

    <section class="flex flex-col items-center justify-center flex-grow px-6">
      <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Iniciar Sesión</h2>

        <!-- Paso 1: Ingresar correo -->
        <div v-if="step === 1">
          <label class="block mb-2 font-medium">Correo Electrónico</label>
          <input
            v-model="correo"
            type="email"
            class="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            @click="login"
            class="w-full bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition mb-4"
          >
            Enviar OTP
          </button>

          <p class="text-center text-gray-600">
            ¿No tienes cuenta?
            <RouterLink to="/register" class="text-blue-600 font-semibold hover:underline">
              Regístrate aquí
            </RouterLink>
          </p>
        </div>

        <!-- Paso 2: Verificar OTP -->
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
      correo: "",
      otp: "",
      step: 1,
    };
  },
  methods: {
    async login() {
      try {
        await api.post("/login/", { correo: this.correo });
        this.step = 2;
      } catch (err) {
        alert(err.response?.data?.error || "Error en login");
      }
    },
    async verifyOtp() {
      try {
        const res = await api.post("/api/verify-login/", {
          correo: this.correo,
          otp: this.otp,
        });

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("correo", this.correo);

        this.$router.push("/dashboard");
      } catch (err) {
        alert(err.response?.data?.error || "Error verificando OTP");
      }
    },
  },
};
</script>
