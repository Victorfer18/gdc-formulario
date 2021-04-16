import { auth, fila } from '../library/superapp.js'
import cache from '../module/cache.js'
export default {
    template: '#c-form',
    data: function () {
        return {
            auth,
            cache,
            fila,
            corruente_user: {
                nome: "Bruno Vieira",
            },
            is_edit: false,
            questions: [],
            zoom: 350,
            margen_zoom: {
                top: 0,
                left: 0
            },
            image_destac: null,
            galery: [],
            arrasto: {
                status: false,
                x: 0, 
                y: 0,
            },
        }
    },
    methods: {
        async get_form() {
            let get_data = await this.fila.questions( this.cache.fila.empresa )
            let playload = get_data.playload
            let grupos = Object.values(playload)
            let adapter = []
            grupos.forEach(post => {
                adapter = adapter.concat(post)
            });
            adapter = adapter.map(post => {
                let render = []
                post.questions = Object.values(post.questions)
                post.questions.forEach(i => { render = render.concat(i) })
                post.questions = render
                return post
            })
            this.questions = adapter
        },
        async logout() {
            let res = await this.auth.logout()
            this.$router.push('/')
        },
        async zoom_default() {
            this.zoom = 250
            this.margen_zoom.top = 0
            this.margen_zoom.left = 0
        },
        async zoom(largura) {
            this.zoom = largura
        },
        async doc_new() {
            let res = await this.fila.get()
            this.cache.fila = res
            await this.get_form()
            this.is_edit = false
            this.galery = [ this.cache.fila?.documento ,...(this.cache.fila.pagina?.split(',') || []) ]
            this.image_destac = this.cache.fila.documento 
            this.$router.push(`/dash/1`)
        },
        async doc_cancel() {
            this.fila.cancel( this.cache.fila.caixa, this.cache.fila.documento )
            this.galery = ['default']
            this.image_destac = 'default'
            this.cache.remove_fila()
            this.is_edit = true
            this.questions = []
        },
        async doc_set( foto ) {
            this.image_destac = foto
        },
        async pivate() {
            let is_logged = await this.auth.logged()
            if (!is_logged) {
                this.$router.push('/')
            }
        },
        async user_logged() {
            let user = await this.auth.get()
            this.corruente_user.nome = user.nome
        },
        async next_stap() {
            if( this.$route.params.step < this.questions.length ) {
                this.$router.push(`/dash/${++this.$route.params.step}`)
            }else {
                let user = await this.auth.get()
                this.$router.push(`/dash/1`)
                this.fila.the_end(user.id, this.cache.fila.caixa)
                this.doc_new()
            }
            this.$refs.forms.scrollTop = 0
        },
        async responder( pergunta_codigo, value ) {
            let user = await this.auth.get()
            this.fila.resposta(user.id, this.cache.fila.caixa, this.cache.fila.documento, pergunta_codigo, value)
        },
        drag_img() {
            this.$refs.image.addEventListener('mousedown', (event) => {             
                this.arrasto.status = true
                this.arrasto.x = event.layerX
                this.arrasto.y = event.layerY
    
            })
            this.$refs.image.addEventListener('mouseup', (event) => { 
                console.log( 'clargou a imagem imagem' )
                this.arrasto.status = false
                this.arrasto.x = 0
                this.arrasto.y = 0
            })
            this.$refs.image.addEventListener('mousemove', (event) => { 
                if( this.arrasto.status ) {
                    this.margen_zoom.top = (this.arrasto.y - event.layerY) / 2
                    this.margen_zoom.left = (this.arrasto.x - event.layerX) / 2
                }
            })
        },
        is_editing() {
            if( !this.cache.fila.caixa ) {
                this.is_edit = true
            }
        },
    },
    async mounted() {
        await this.pivate()
        await this.get_form()
        await this.user_logged()
        this.is_editing()
        this.galery = [ this.cache.fila?.documento ,...(this.cache.fila.pagina?.split(',') || []) ]
        this.image_destac = this.cache.fila.documento        
    }

}