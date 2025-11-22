<template>
  <q-page padding>

    <!-- Barra de filtros -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-6">
        <q-input
          filled
          v-model="searchName"
          label="Buscar por nombre"
          debounce="300"
        />
      </div>

      <div class="col-12 col-sm-6">
        <q-select
          filled
          v-model="searchLevel"
          :options="levels"
          label="Filtrar por nivel"
          emit-value
          map-options
        />
      </div>
    </div>

    <!-- Digimons -->
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="digimon in filteredDigimons"
        :key="digimon.name"
      >
        <q-card>
          <q-img :src="digimon.img" :alt="digimon.name" :ratio="4/3" />
          <q-card-section>
            <div class="text-h6">{{ digimon.name }}</div>
            <div class="text-subtitle2">Nivel: {{ digimon.level }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const digimons = ref([])
const searchName = ref('')
const searchLevel = ref(null)
const levels = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://digimon-api.vercel.app/api/digimon')
    digimons.value = await res.json()

    levels.value = [...new Set(digimons.value.map(d => d.level))].map(level => ({
      label: level,
      value: level
    }))
  } catch (err) {
    console.error('Error al cargar Digimons:', err)
  }
})

const filteredDigimons = computed(() => {
  return digimons.value.filter(d => {
    const matchName = d.name.toLowerCase().includes(searchName.value.toLowerCase())
    const matchLevel = searchLevel.value ? d.level === searchLevel.value : true
    return matchName && matchLevel
  })
})
</script>

<style scoped>
/* Para que quede bonito */
.q-card {
  border-radius: 14px;
  overflow: hidden;
}
</style>
