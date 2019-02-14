<template>
  <section class="page">
    <!-- Vue tag to add header component -->
    <header-prismic/>
    <div class="container">
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>
      <!-- Slice section template -->
      <section v-for="(slice, index) in slices" :key="'slice-' + index">
        <!-- Text slice component -->
        <template v-if="slice.slice_type === 'text_section'">
          <text-slice 
            :label="slice.slice_label" 
            :text="slice.primary.rich_text"
          />
        </template>
        <!-- Quote slice component -->
        <template v-else-if="slice.slice_type === 'quote'">
          <quote-slice :quote="slice.primary.quote_text"/>
        </template>
        <!-- Full Width Image slice component -->
        <template v-else-if="slice.slice_type === 'full_width_image'">
          <full-width-image :img="slice.primary.image"/>
        </template>
        <!-- Image Gallery slice component -->
        <template v-else-if="slice.slice_type === 'image_gallery'">
          <image-gallery 
            :title="slice.primary.gallery_title" 
            :items="slice.items"
          />
        </template>
        <!-- Image Highlight slice component -->
        <template v-else-if="slice.slice_type === 'image_highlight'">
          <image-highlight 
            :title="slice.primary.title"
            :headline="slice.primary.headline"
            :link="slice.primary.link"
            :link_label="slice.primary.link_label"
            :img="slice.primary.featured_image"
          />
        </template>
      </section>
    </div>
  </section>
</template>

<script>
// imports for all components
import HeaderPrismic from '../components/HeaderPrismic.vue'
import TextSlice from '../components/slices/TextSlice.vue'
import QuoteSlice from '../components/slices/QuoteSlice.vue'
import FullWidthImage from '../components/slices/FullWidthImage.vue'
import ImageGallery from '../components/slices/ImageGallery.vue'
import ImageHighlight from '../components/slices/ImageHighlight.vue'

export default {
  name: 'page',
  components: {
    HeaderPrismic,
    TextSlice,
    QuoteSlice,
    FullWidthImage,
    ImageGallery,
    ImageHighlight
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