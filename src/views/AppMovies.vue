<template>
  <div>
    <label for="term">Product filter</label>
    <input type="text" v-model="term" />
    <ul>
      <li v-for="(movie,index) in filteredArray" :key="index">
          <MoviesRow 
          :movie = "movie"
          />
      </li>
    </ul>
  </div>
</template>

<script>
import { moviesService } from '@/services/moviesService'
import MoviesRow from './MovieRow'

export default {
  components: {
    MoviesRow
  },

  data() {
    return {
      movies : [],
      term: ""
    }
  },

   computed: {
    filteredArray() {
        return this.movies.filter(movie => {
            return movie.title.toLowerCase().includes(this.term.toLowerCase())
        })
    }    
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      moviesService.getAll()
      .then(response => {
        vm.movies = response.data
      }).catch(e => {
        console.log(e)
      })
    })
  },
}
</script>

<style>

</style>

