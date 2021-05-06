import { auth, fila } from '../library/superapp.js'
import cache from '../module/cache.js'
export default {
    template: '#c-form',
    data: function () {
        return {
            auth,
            cache,
            fila,
            popup: false,
            loading: false,
            sinais_vitais: {},
            ficha: {
                seguencial: 0,
                data: '00/00/000',
                funcionario: 0
            },
            vital: {
                nome: 'Jose Antonio',
                altura: '1,75',
                peso: '87',
                presao: '12,5',
            },
            corruente_user: {
                nome: "Bruno Vieira",
            },
            is_edit: false,
            questions: [],
            zoom: 800,
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
            error: {
                status: false,
                message: ''
            }
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
            if( this.$route.params.step == 1 ) {
                this.loading = true 
                let res = await this.fila.sinais_vitais(
                    this.sinais_vitais.temperatura,
                    this.cache.fila.data || '00/00/000',
                    this.sinais_vitais.Altura,
                    this.sinais_vitais.biotipo,
                    this.sinais_vitais.pulso,
                    this.sinais_vitais.frequencia,
                    this.sinais_vitais.cintura,
                    this.sinais_vitais.quadril,
                    this.sinais_vitais.peso,
                    this.sinais_vitais.pressao_max,
                    this.sinais_vitais.pressao_min,
                )
                if ( res.status ) {
                    this.$router.push(`/dash/${++this.$route.params.step}`)
                    this.loading = false
                } else {
                    this.loading = false
                    this.error.status = true
                    this.error.message = res.message
                }

            } else {
                if( this.$route.params.step < this.questions.length ) {
                    this.$router.push(`/dash/${++this.$route.params.step}`)
                }else {
                    this.loading = true
                    let user = await this.auth.get()
                    setInterval( () => {
                        this.loading = false
                    }, 3000 )
                    this.$router.push(`/dash/1`)
                    this.fila.the_end(user.id, this.cache.fila.sequencia_code)
                    this.doc_new()
                }
                this.$refs.forms.scrollTop = 0
            }
        },
        async responder( pergunta_codigo, value, grupo ) {
            if( grupo != 'VITAL' ) {
                let user = await this.auth.get()
                this.fila.resposta(user.id, this.cache.fila.caixa, this.cache.fila.sequencia_code, pergunta_codigo, value)
            }else {
                this.sinais_vitais[pergunta_codigo] = value
            }
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
        toggle_pop() { this.popup = !this.popup }
    },
    async mounted() {
        await this.pivate()
        await this.get_form()
        await this.user_logged()
        this.is_editing()
        this.galery = [ this.cache.fila?.documento ,...(this.cache.fila.pagina?.split(',') || []) ]
        this.image_destac = this.cache.fila.documento        
        this.ficha.seguencial = this.cache.fila.sequencia_code
        this.ficha.data = this.cache.fila.data || '00/00/0000'
        this.ficha.funcionario = this.cache.fila.funcionario || 0
    }

}