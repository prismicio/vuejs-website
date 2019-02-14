<template>
  <section class='full-width-image content-section'>
      <prismic-image :field="img"/>
  </section>
</template>

<script>
export default {
  props: ['img'],
  name: 'image-caption-slice'
}
</script>