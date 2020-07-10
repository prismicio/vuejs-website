<template>
  <div class="container">
    <h3>Loading the Prismic's Preview...</h3>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Preview',
  beforeCreate () {
    const { token, documentId } = this.$route.query
    this.$prismic.client.getPreviewResolver(token, documentId).resolve(this.$prismic.linkResolver, '/')
      .then((url) => {
        window.location.replace(url)
      })
  }
}
</script>
