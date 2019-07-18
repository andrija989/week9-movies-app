<template>
  <div>
    <label for="term">Product filter</label>
    <input type="text" v-model="term" />
    <p >
      Selected number of movies {{selected.length}}
    </p>
    <paginate name="movies" :list="filteredArray" :per="4">
      <ul v-for="movie in paginated('movies')" :key="movie.id">
          <MoviesRow 
          :movie = "movie"
          @select-movie="selectMovie(index)"
          />
      </ul>
    </paginate>
    <div>
      <paginate-links class="btn btn-primary" for="movies" :simple="{
        prev: 'Back',
        next: 'Next'
        }">
      </paginate-links>
    </div>
    
    <div>
      <button @click="selectAll()">
        Select all
      </button>
      <button @click="deselectAll()">
        Deselect all
      </button>
    </div>
    <div>
      <button @click="nameSortAsc()">
        Sort by Name asc
      </button>
      <button @click="nameSortDsc()">
        Sort by Name desc
      </button>
      <button @click="durationSortAsc()">
        Sort by Duration asc
      </button>
      <button @click="durationSortDsc()">
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
      selected : [],
      paginate: ["movies"]
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

   sortByName(a, b) {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if (titleA > titleB) {
        return 1;
      }
      if (titleA < titleB) {
        return -1;
      }
      return 0;
    },

    nameSortAsc() {
      this.movies.sort(this.sortByName);
    },

    nameSortDsc() {
      this.movies.sort(this.sortByName).reverse();
    },

    sortByDuration(a, b) {
      if (a.duration > b.duration) {
        return 1;
      }
      if (a.duration < b.duration) {
        return -1;
      }
      return 0;
      },

      durationSortAsc() {
        this.movies.sort(this.sortByDuration);
      },
      durationSortDsc() {
      this.movies.sort(this.sortByDuration).reverse();
      },
  },
}
</script>

<style>

</style>

