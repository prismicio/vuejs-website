<template>
  <section class='highlight content-section'>
    <div class="highlight-left">
      <prismic-rich-text :field="title"/>
      <prismic-rich-text :field="headline"/>
      <p>
        <prismic-link :field="link">{{ $prismic.richTextAsPlain(link_label) }}</prismic-link>
      </p>
    </div>
    <div class="highlight-right">
      <prismic-image :field="img"/>
    </div>
  </section>
</template>

<script>
export default {
  props: ['title','headline','link','link_label','img'],
  name: 'image-highlight'
}
</script>

<style scoped>
.highlight {
  position: relative;
  overflow: auto;
}
.highlight-left {
  width: 43%;
  float: left;
}
.highlight-right {
  width: 48%;
  float: right;
}
</style>
