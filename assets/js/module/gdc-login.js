import { auth } from '../library/superapp.js'
export default {
    template: '#c-login',
    data: function () {
        return {
            auth,
            error: false,
            email: 'teste@vfc.com.br',
            senha: 'Adm*n@2021'
        }
    },
    methods: {
        async login() {
            let { next } = await this.auth.login(this.email, this.senha)
            if( next ) {
                this.$router.push('dash')
            }else {
                this.error = true
            }
        }
    },
    async mounted() {
        let is_logged = await this.auth.logged()
        if( is_logged ) {
            this.$router.push('dash')
        }        
    }
}