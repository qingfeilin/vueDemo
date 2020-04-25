import moment from 'moment'
import _ from 'lodash'
let CommonMixinInfo = {
  name: 'CommonMixin'
}
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.mixingconsole()
  },
  beforeRouteEnter (to, from, next) {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    mixingconsole () {
      console.log(_.get(CommonMixinInfo, 'name'), moment().format('YYYY-MM-DD hh:mm:ss'))
    }
  }
}
