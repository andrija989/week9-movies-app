<template>
  <div>
    <label for="term">Product filter</label>
    <input type="text" v-model="term" />
    <p >
      Selected number of movies {{selected.length}}
    </p>
    <ul>
      <li v-if="filteredArray.length == 0">Your search has no results, try again</li>
      <li v-for="(movie,index) in filteredArray" :key="index">
          <p v-if="filteredArray.length == 0"> Empty</p>
          <MoviesRow 
          :movie = "movie"
          @select-movie="selectMovie(index)"
          />
      </li>
    </ul>
    <div>
      <button @click="selectAll()">
        Select all
      </button>
      <button @click="deselectAll()">
        Deselect all
      </button>
    </div>
    <div>
      <button @click="nameFilterAsc()">
        Sort by Name asc
      </button>
      <button @click="nameFilterDsc()">
        Sort by Name desc
      </button>
      <button>
        Sort by Duration asc
      </button>
      <button>
        Sort by Duration desc
      </button>
    </div>
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
      term: "",
      selected : []
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

  methods: {
    selectMovie(index) {
      if(this.selected.includes(index)) {
        return console.log('element is in array')
      }else {
        this.selected.push(index)
        console.log(this.selected)
      }
    },

    selectAll() {
      return this.filteredArray.filter(movie => {
          if(this.selected.includes(movie.id)) {
            return
          } else {
            return this.selected.push(movie.id)
          }
            
        })
    },
    deselectAll() {
      this.selected.splice(0,this.selected.length)
    },

    nameFilterAsc() {
      this.filteredArray.sort(function(a,b) {
        var movieA = a.title.toUpperCase(); 
        var movieB = b.title.toUpperCase()
        if (movieA > movieB) {
        return -1;
        }
      })
      console.log(this.filteredArray)
    },

    nameFilterDsc() {
      this.filteredArray.sort(function(a,b) {
        var movieA = a.title.toUpperCase(); 
        var movieB = b.title.toUpperCase()
        if (movieA < movieB) {
        return -1;
        }
      })
      console.log(this.filteredArray)
    }
  }
}
</script>

<style>

</style>

