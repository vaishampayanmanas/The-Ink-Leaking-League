import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsers, faChartLine, faGear, faClipboardQuestion, faFile, faStar, faComments, faPlus, faCaretRight, faPencil, faRightToBracket, faTrashCan, faUpload, faCloudArrowDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faChartLine, faGear, faClipboardQuestion, faFile, faStar, faComments, faPlus, faCaretRight, faPencil, faRightToBracket, faTrashCan, faUpload, faCloudArrowDown, faMagnifyingGlass);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
