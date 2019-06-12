<template>
  <section class="page">
    <!-- Vue tag to add header component -->
    <header-prismic/>
    <div class="container">
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>
      <!-- Slices block component -->
      <slices-block :slices="slices"/>
    </div>
  </section>
</template>

<script>
// imports for all components
import HeaderPrismic from '../components/HeaderPrismic.vue'
import SlicesBlock from '../components/SlicesBlock.vue'

export default {
  name: 'page',
  components: {
    HeaderPrismic,
    SlicesBlock,
  },
  data () {
    return {
      documentId: '',
      slices: []
    }
  },
  methods: {
    getContent (uid) {
      //Query to get post content
      this.$prismic.client.getByUID('page', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            
            //Set slices as variable
            this.slices = document.data.page_content
          } 
          else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>