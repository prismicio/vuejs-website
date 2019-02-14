<template>
  <section class="homepage">
    <!-- Vue tag to add header component -->
    <header-prismic/>
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId"/>
    <section class="homepage-banner" :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(' + fields.image + ')' }">
      <!-- Template for page title. -->
      <div class="banner-content container">
        <h2 class="banner-title">
          {{ $prismic.richTextAsPlain(fields.title) }}
        </h2>
        <!-- Template for page tagline -->
        <p class="banner-description">{{ $prismic.richTextAsPlain(fields.tagline) }}</p>
        <prismic-link class="banner-button" :field="fields.button_link">
          {{ $prismic.richTextAsPlain(fields.button_label) }}
        </prismic-link>
      </div>
    </section>
    <div class="container">
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
  name: 'home-page',
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
      fields: {
        title: null,
        tagline: null,
        image: null,
        button_link: null,
        button_label: null
      },
      slices: []
    }
  },
  methods: {
    getContent () {
      //Query to get home content
      this.$prismic.client.getSingle('homepage')
        .then((document) => {
          if (document) {
            this.documentId = document.id;
            const banner = document.data.homepage_banner[0];
            this.fields.image = banner.image.url;
            this.fields.title = banner.title;
            this.fields.tagline = banner.tagline;
            this.fields.button_link = banner.button_link;
            this.fields.button_label = banner.button_label;

            //Set slices as variable
            this.slices = document.data.page_content

          } else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    },
  },
  created () {
    this.getContent()
  }
}
</script>

<style>
.homepage-banner {
  margin: -70px 0 80px;
  padding: 10em 0 8em;
  background-position: center center;
  background-size: cover;
  color: #ffffff;
  line-height: 1.75;
  text-align: center;
}
.banner-content {
  text-align: center;
}
.banner-title,
.banner-description {
  width: 90%;
  max-width: 490px;
  margin-left: auto;
  margin-right: auto;
}
.banner-title {
  color: #ffffff;
  font-size: 70px;
  font-weight: 900;
  line-height: 70px;
}
.banner-button {
  background: #ffffff;
  border-radius: 7px;
  color: #484D52;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 40px;
}
.banner-button:hover {
  background: #c8c9cb;
}
</style>
