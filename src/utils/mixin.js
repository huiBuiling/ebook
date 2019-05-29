import { mapGetters } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'titleVisible',
      'menuVisible'
    ])
  }
}
