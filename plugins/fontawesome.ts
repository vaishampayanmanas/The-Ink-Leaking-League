import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsers, faChartLine, faGear, faClipboardQuestion, faFile, faStar, faComments, faPlus, faCaretRight } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faChartLine, faGear, faClipboardQuestion, faFile, faStar, faComments, faPlus, faCaretRight);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
