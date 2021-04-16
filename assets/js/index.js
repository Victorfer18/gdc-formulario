import Vue from './library/vue.js'
import Router from './library/vue-router.js'
import routes from './module/routes.js'
import gdcLogin from './module/gdc-login.js'
import gdcForm from './module/gdc-form.js'

Vue.use(Router)

const router = new Router( { routes } )

Vue.component( 'gdc-login', gdcLogin )
Vue.component( 'gdc-form', gdcForm )

const app = new Vue({
    router,
    data: {
        title: null
    }
}).$mount('#app')