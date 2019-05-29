import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'titleVisible',
      'menuVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setTitleVisible',
      'setMenuVisible'
    ])
  }
}
