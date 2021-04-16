
const cache = {
    name: 'CACHE_DEV',
    get: () => JSON.parse(localStorage.getItem(cache.name) || '{}'),
    set: object => localStorage.setItem(cache.name, JSON.stringify({ ...cache.get(), ...object }))
}

function Http( base = null )
{
    let protocol = window.location.protocol
    let hostname =  window.location.hostname.replace( 'www.', '' )
    base         = base == null ? `${protocol}//${hostname}` : base
    let options  = {
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        credentials: "same-origin",
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: null
    }
    function obj_to_url( obj ) 
    {
        let indices =  Object.keys( obj );
        let url     = indices.map( i => `${i}=${obj[i]}` ).join('&');
        return encodeURI( url );            
    }
    const post = async ( path, data, fn = null ) => 
    {
        let end_point = base + path
        let dados     = obj_to_url( data )
        let opt       = options
        opt.body      = dados
        try {            
            let request   = await fetch( end_point, opt )
            let res       = await request.json()
            if( fn ) { fn( res ) }        
            return res
        } catch (error) {
            console.log( error )
            return false            
        }
    }
    const get = async ( path, data, fn = null ) => 
    {
        let dados     = obj_to_url( data )
        let end_point = base + path + "?" + dados
        try {            
            let request   = await fetch( end_point )
            let res       = await request.json()
            if( fn ) { fn( res ) }       
            return res
        } catch (error) {
            console.log( error )
            return false
        }
    }
    return {
        obj_to_url,
        base,
        get,
        post        
    }
}

const Api = Http('http://api.digitalgroupbrasil.com.br')

const crud = {
    get: name => cache.get()?.[name] || [],
    post: (name, data) => {
        let storage = cache.get()
        data = { id: Date.now() , ...data }
        storage[name] = [...(storage?.[name] || []), data]
        cache.set(storage)
    },
    me: (name, id) => (cache.get()?.[name] || []).find(data => data?.id == id),
    del: (name, id) => {
        let storage = cache.get()
        storage[name] = (storage?.[name] || []).filter(post => post?.id != id)
        cache.set(storage)
    },
    put: (name, data) => {
        let storage = cache.get()
        storage[name] = (storage?.[name] || []).map(post => {
            if (post?.id == data?.id)
                post = { ...post, ...data }
            return post
        })
    }
}

const auth = {
    login: async (username, password) =>  {
      let res = await Api.post('/v1/login', {email:username, senha:password})
      if( res.next ) {
        auth.set(res.jwt)
      }
      return res
    }, 
    logged: async () => auth.jwt() != null,
    logout: async () => localStorage.removeItem('ACCESS_TOKEN'),
    set: async token =>  localStorage.setItem('ACCESS_TOKEN', token),
    jwt: () => localStorage.getItem('ACCESS_TOKEN'), 
    get: async () =>  JSON.parse( atob( (await auth.jwt()).split('.')[0] ) ),
    me: async () =>  await Api.get('/v1/me', { jwt: (await auth.jwt()) })
}

const fila = {
    get: async () => await Api.get('/v1/fila', { jwt: (await auth.jwt()) }),
    the_end: async (caixa, documento) => await Api.post('/v1/finalizar', { jwt: (await auth.jwt()), caixa, documento }),
    questions: async codigo_empresa => await Api.get('/v1/formulario', { jwt: (await auth.jwt()), codigo_empresa }),
    image: foto => `http://api.digitalgroupbrasil.com.br/v1/image/${foto}`,
    resposta: async (usuario_id, caixa, documento, pergunta_codigo, value) => await Api.get('/v1/formulario', { jwt: (await auth.jwt()), usuario_id, caixa, documento, pergunta_codigo, value }),
    cancel: async (caixa, documento) => await Api.get('/v1/formulario', { jwt: (await auth.jwt()), caixa, documento })
}

export { auth, fila }