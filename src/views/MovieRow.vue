<template>
  <div>
    <li>
      {{ movie }}
      <div>
        <button @click="handleSelect">Select</button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: ['movie'],

  methods: {
    handleSelect () {
      this.$emit('select-movie')
    }
  },

  computed: {
    routeToMovie () {
      return `/movies/${this.movie.id}`
    }
  }
}
</script>
