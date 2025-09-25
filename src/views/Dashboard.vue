<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">CashTrack</h1>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 font-bold rounded-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Gastos Total -->
        <div class="bg-white rounded-xl shadow p-6">
          <h2 class="text-gray-600 font-semibold">Gasto Total</h2>
          <p
            class="text-3xl font-bold mt-2"
            :class="total > presupuesto ? 'text-red-600' : 'text-blue-600'"
          >
            {{ formatearDinero(total) }}
          </p>
        </div>

        <!-- Progreso Mensual -->
        <div class="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-center">
          <h2 class="text-gray-600 font-semibold mb-2">Progreso Total</h2>

          <!-- Porcentaje numérico -->
          <span
            class="text-lg font-bold mb-3"
            :class="progreso > 100 ? 'text-red-600' : 'text-blue-600'"
          >
            {{ progreso }}%
          </span>

          <!-- Barra de progreso -->
          <div class="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              class="h-6 text-xs text-white text-center p-0.5 leading-none rounded-full"
              :class="progreso > 100 ? 'bg-red-600' : 'bg-blue-600'"
              :style="{ width: progreso + '%' }"
            ></div>
          </div>

          <p class="text-sm text-gray-500 mt-3">
            {{ formatearDinero(total) }} de {{ formatearDinero(presupuesto) }}
          </p>
        </div>
      </div>

      <!-- Acciones Rápidas -->
      <div class="bg-white rounded-xl shadow p-6 mb-8 flex gap-2.5 items-center">
        <button
          @click="mostrarModal = true"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Añadir Gasto
        </button>
        <button
          @click="abrirModalPresupuesto"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Establecer Presupuesto a gastar
        </button>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Gastos Recientes -->
        <div class="bg-white rounded-xl shadow p-6">
          <h2 class="text-gray-700 font-semibold mb-4">Gastos Recientes</h2>
          <div
            v-for="gasto in gastos"
            :key="gasto.id"
            class="flex justify-between items-center py-3 border-b last:border-0"
          >
            <div>
              <p class="font-semibold">{{ gasto.categoria }}</p>
              <p class="text-sm text-gray-500">
                {{ formatearFecha(gasto.fecha) }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-bold text-gray-700">
                {{ formatearDinero(gasto.cantidad) }}
              </span>
              <button @click="editarGasto(gasto)" class="text-blue-500 font-bold">✏️</button>
              <button @click="borrarGasto(gasto.id)" class="text-red-500 font-bold">❌</button>
            </div>
          </div>
        </div>

        <!-- Resumen de Gastos -->
        <!-- Resumen de Gastos -->
        <div class="bg-white rounded-xl shadow p-6 mt-6">
          <h2 class="text-gray-600 font-semibold mb-4">Resumen de Gastos</h2>

          <div v-for="(valor, categoria) in categorias" :key="categoria" class="mb-4">
            <div class="flex justify-between items-center mb-1">
              <span class="font-medium flex items-center gap-2">
                <!-- Icono y color dinámico -->
                <span
                  class="w-3 h-3 rounded-full"
                  :class="coloresCategorias[categoria] || 'bg-gray-500'"
                ></span>
                {{ capitalizar(categoria) }}
              </span>
              <!-- 👇 aquí usamos valor.valor -->
              <span class="font-semibold">{{ formatearDinero(valor.valor) }}</span>
            </div>

            <!-- Barra de progreso por categoría -->
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="h-3 rounded-full"
                :class="coloresCategorias[categoria] || 'bg-gray-500'"
                :style="{ width: valor.porcentaje + '%' }"
              ></div>
            </div>
            <!-- 👇 y aquí usamos valor.porcentaje -->
            <p class="text-xs text-gray-500 mt-1">{{ valor.porcentaje }}%</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Modal de Presupuesto -->
    <div
      v-if="mostrarPresupuesto"
      class="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-2xl w-96 relative transform transition-all scale-95 hover:scale-100"
      >
        <button
          @click="mostrarPresupuesto = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 class="text-xl font-bold text-blue-600 mb-5 text-center">Definir Presupuesto</h2>

        <label class="block text-sm font-medium text-gray-600 mb-1">Monto</label>
        <input
          v-model="presupuestoTmp"
          type="number"
          placeholder="Ingrese el monto"
          class="border border-gray-300 p-2 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
        />

        <div class="flex justify-end gap-3">
          <button
            @click="mostrarPresupuesto = false"
            class="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            @click="guardarPresupuesto"
            class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Añadir Gasto -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-2xl w-96 relative transform transition-all scale-95 hover:scale-100"
      >
        <button
          @click="mostrarModal = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 class="text-xl font-bold text-blue-600 mb-5 text-center">Registrar Gasto</h2>

        <label class="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
        <select
          v-model="nuevo.categoria"
          class="border border-gray-300 p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="otros">Otros</option>
        </select>

        <label class="block text-sm font-medium text-gray-600 mb-1">Cantidad</label>
        <input
          v-model="nuevo.cantidad"
          type="number"
          placeholder="Ingrese el valor"
          class="border border-gray-300 p-2 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
        />

        <div class="flex justify-end gap-3">
          <button
            @click="mostrarModal = false"
            class="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            @click="agregarGasto"
            class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Editar Gasto -->
    <div
      v-if="editando"
      class="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-2xl w-96 relative transform transition-all scale-95 hover:scale-100"
      >
        <button
          @click="editando = null"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 class="text-xl font-bold text-blue-600 mb-5 text-center">Editar Gasto</h2>

        <label class="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
        <select
          v-model="editando.categoria"
          class="border border-gray-300 p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="otros">Otros</option>
        </select>

        <label class="block text-sm font-medium text-gray-600 mb-1">Cantidad</label>
        <input
          v-model="editando.cantidad"
          type="number"
          placeholder="Ingrese el valor"
          class="border border-gray-300 p-2 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
        />

        <div class="flex justify-end gap-3">
          <button
            @click="editando = null"
            class="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            @click="actualizarGasto"
            class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      gastos: [],
      categorias: {},
      total: 0,
      presupuesto: 0,
      presupuestoTmp: 0, // 🟡 el temporal (solo para el input del modal)
      nuevo: { categoria: 'comida', cantidad: 0 },
      mostrarModal: false,
      mostrarPresupuesto: false,
      editando: null,
      // 🎨 Colores por categoría
      coloresCategorias: {
        comida: 'bg-red-500',
        transporte: 'bg-blue-500',
        entretenimiento: 'bg-orange-500',
        otros: 'bg-gray-600',
      },
    }
  },
  computed: {
    progreso() {
      if (!this.presupuesto || this.presupuesto <= 0) return 0
      return Math.min(Math.round((this.total / this.presupuesto) * 100), 999)
    },
  },
  methods: {
    abrirModalPresupuesto() {
      this.presupuestoTmp = this.presupuesto // precargar el actual
      this.mostrarPresupuesto = true
    },
    async guardarPresupuesto() {
      try {
        const token = localStorage.getItem('token')
        await api.post(
          '/api/presupuesto/',
          { presupuesto: this.presupuestoTmp }, // 🔥 usamos presupuesto directo
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.presupuesto = this.presupuestoTmp // sincronizar con el oficial
        this.mostrarPresupuesto = false
        this.cargarDashboard()
      } catch (err) {
        console.error('Error guardando presupuesto:', err.response?.data || err)
      }
    },
    editarGasto(gasto) {
      this.editando = { ...gasto }
    },
    async actualizarGasto() {
      try {
        const token = localStorage.getItem('token')
        await api.put(`/api/gastos/${this.editando.id}/`, this.editando, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.editando = null
        this.cargarDashboard()
      } catch (err) {
        console.error('Error actualizando gasto:', err.response?.data || err)
      }
    },
    async borrarGasto(id) {
      try {
        const token = localStorage.getItem('token')
        await api.delete(`/api/gastos/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.cargarDashboard()
      } catch (err) {
        console.error('Error borrando gasto:', err.response?.data || err)
      }
    },
    async cargarDashboard() {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/api/dashboard/', {
          headers: { Authorization: `Bearer ${token}` },
        })

        this.gastos = res.data.gastos
        this.categorias = {}
        for (const [categoria, data] of Object.entries(res.data.categorias)) {
          this.categorias[categoria] = {
            valor: parseFloat(data.valor) || 0,
            porcentaje: parseFloat(data.porcentaje) || 0,
          }
        }

        this.total = parseFloat(res.data.total) || 0
        this.presupuesto = parseFloat(res.data.presupuesto) || 0
      } catch (err) {
        console.error('Error cargando dashboard:', err.response?.data || err)
      }
    },
    async agregarGasto() {
      try {
        const token = localStorage.getItem('token')
        await api.post('/api/gastos/', this.nuevo, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.nuevo.cantidad = 0
        this.mostrarModal = false
        this.cargarDashboard()
      } catch (err) {
        console.error('Error registrando gasto:', err.response?.data || err)
      }
    },
    logout() {
      localStorage.clear()
      window.location.href = '/'
    },
    formatearFecha(fechaStr) {
      const fecha = new Date(fechaStr)
      return fecha.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    formatearDinero(valor) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(valor)
    },
    calcularPorcentaje(valor) {
      const total = Number(this.total) || 0
      return total > 0 ? ((Number(valor) / total) * 100).toFixed(1) : 0
    },

    capitalizar(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    },
  },
  created() {
    this.cargarDashboard()
  },
}
</script>
