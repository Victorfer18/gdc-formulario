export default {
    set fila(valor) {
        localStorage.setItem('CORRUENTE_DOC', JSON.stringify(valor))
    },
    get fila() {
        return JSON.parse( localStorage.getItem('CORRUENTE_DOC') || '{}' )
    },
    remove_fila() {
        localStorage.removeItem('CORRUENTE_DOC')
    }
}