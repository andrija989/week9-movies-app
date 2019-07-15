<template>
  <div>
    <router-link :to="routeToMovie">
      {{ movie }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['movie'],

  computed: {
    routeToMovie () {
      return `/movies/${this.movie.id}`
    }
  }
}
</script>
