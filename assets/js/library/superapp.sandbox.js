
const cache = {
  name: 'CACHE_DEV',
  get: () => JSON.parse(localStorage.getItem(cache.name) || '{}'),
  set: object => localStorage.setItem(cache.name, JSON.stringify({ ...cache.get(), ...object }))
}

const crud = {
  get: name => cache.get()?.[name] || [],
  post: (name, data) => {
    let storage = cache.get()
    data = { id: Date.now(), ...data }
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
  login: async (username, password) => {
    if (username == 'jose1987@gmail.com' && password == '123') {
      let playload = {
        id: '00000000000000001',
        email: 'jose1987@gmail.com',
        name: 'Jose',
        foto: 'https://thispersondoesnotexist.com'
      }
      auth.set(`000001.${btoa(JSON.stringify(playload))}`)
      cache.set({
        corruente_user: playload
      })
      return {
        next: true,
        message: "Logado com sucesso"
      }
    } else {
      return {
        next: false,
        message: "nome de usuário ou senha está errado"
      }
    }
  },
  logged: async () => auth.jwt() != null,
  logout: async () => localStorage.removeItem('ACCESS_TOKEN'),
  set: async token => localStorage.setItem('ACCESS_TOKEN', token),
  jwt: () => localStorage.getItem('ACCESS_TOKEN'),
  get: async () => cache?.corruente_user?.[0] || {},
  put: async () => ({ next: true, message: null, playload: null }),
  me: async () => ({
    "next": true,
    "message": "JWT valido",
    "jwt": `000001.${btoa(JSON.stringify({
      id: '00000000000000001',
      email: 'jose1987@gmail.com',
      name: 'Jose',
      foto: 'https://thispersondoesnotexist.com'
    }))}`
  })
}

const fila = {
  get: async () => ({
    "next": true,
    "message": "solicitacao feita",
    "caixa": "ERIUGFG123",
    "documento": "GHIUGH6",
    "pagina": "GHIUGH6-1,GHIUGH6-2"
  }),
  the_end: async () => ({
    "next": true,
    "message": "finalizado com sucesso"
  }),
  questions: async () => ({
    "next": true,
    "message": null,
    "playload": {
      "1": [
        {
          "id": "4",
          "nome": "ANTECEDENTES FAMILIARES (Seus Familiares diretos [pai, mãe, irmãos], mesmo já falecido, tem ou tiver",
          "grupo_codigo": "RHMED_1",
          "posicao": "1",
          "codigo_empresa": "414531",
          "questions": {
            "1": [
              {
                "id": "1",
                "codigo": "116",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Turberculose",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "2",
                "codigo": "1",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Turberculose",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "3",
                "codigo": "2",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "4",
                "codigo": "117",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "5",
                "codigo": "118",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Diabete (açúcar no sangue)",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "6",
                "codigo": "3",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Diabete (açúcar no sangue)",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "7",
                "codigo": "119",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "8",
                "codigo": "4",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "9",
                "codigo": "5",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Pressão Alta",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "10",
                "codigo": "120",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Pressão Alta",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "11",
                "codigo": "121",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "12",
                "codigo": "6",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "13",
                "codigo": "7",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Câncer",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "14",
                "codigo": "11",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "15",
                "codigo": "110",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Doença do Coração",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM , NÃO"
              },
              {
                "id": "16",
                "codigo": "111",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "17",
                "codigo": "9",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Doença Mental\/ Nervosa",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "18",
                "codigo": "10",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "19",
                "codigo": "122",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Câncer",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "22",
                "codigo": "123",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "23",
                "codigo": "124",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Doença do Coração",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "25",
                "codigo": "125",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "27",
                "codigo": "126",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Doença Mental\/ Nervosa",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "29",
                "codigo": "127",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Em caso de SIM, quem?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "121",
                "codigo": "149",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Varizes?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "122",
                "codigo": "150",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Tonturas ou desmaios?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "123",
                "codigo": "151",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Dor de cabeça frequente?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "124",
                "codigo": "152",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Vacina antitetânica atualizada (a cada 10 anos)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "125",
                "codigo": "153",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Possui vacina para Hepatite B atualizada (3 doses)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "126",
                "codigo": "154",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Possui alguma deficiência?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "127",
                "codigo": "155",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "128",
                "codigo": "156",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Sofreu alguma doença não mencionada?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "129",
                "codigo": "157",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "130",
                "codigo": "158",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Já esteve internado alguma vez?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "131",
                "codigo": "159",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "132",
                "codigo": "160",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Cirurgias realizadas ou programadas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "133",
                "codigo": "161",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "134",
                "codigo": "162",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Suas condições de saúde exigem trabalho especial?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "135",
                "codigo": "163",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "136",
                "codigo": "164",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Esteve afastado pelo INSS?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "137",
                "codigo": "165",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "138",
                "codigo": "166",
                "grupo_codigo": "RHMED_1",
                "enunciado": "OBS:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "159",
                "codigo": "191",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Como considera sua alimentação? ",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Saudável, Regular, Não saudável"
              },
              {
                "id": "160",
                "codigo": "200",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Dentista - revisão\/tratamento",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Nos últimos 12 meses, de 12 a 24 meses, Há mais de 24 meses"
              },
              {
                "id": "161",
                "codigo": "192",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Consumo de água\/liquidos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Acima de 9 copos\/dia, de 5 a 8 copos\/dia, Até 4 copos\/dia"
              },
              {
                "id": "162",
                "codigo": "193",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Preventivo Ginecológico atualizado?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não "
              },
              {
                "id": "163",
                "codigo": "194",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Mamografia ou Ultrassom das mamas em 2 anos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não "
              },
              {
                "id": "164",
                "codigo": "195",
                "grupo_codigo": "RHMED_1",
                "enunciado": "É gestante?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "165",
                "codigo": "196",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Data da Última Menstruação",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "166",
                "codigo": "197",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Próstata - exame (toque) nos últimos 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não "
              },
              {
                "id": "167",
                "codigo": "198",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Próstata - exame de sangue (PSA) nos últimos 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim , Não"
              },
              {
                "id": "168",
                "codigo": "199",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Hidrocele\/Varicocele?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim , Não"
              },
              {
                "id": "169",
                "codigo": "201",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local muito barulhento?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "170",
                "codigo": "76",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local muito barulhento?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "171",
                "codigo": "77",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local com muita poeira?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "172",
                "codigo": "202",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local com muita poeira?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "173",
                "codigo": "203",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Manipulação de produtos químicos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "174",
                "codigo": "78",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Manipulação de produtos químicos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "175",
                "codigo": "79",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local muito frio?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "176",
                "codigo": "204",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local muito frio?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "177",
                "codigo": "80",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local com muito calor?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "178",
                "codigo": "205",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Local com muito calor?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "179",
                "codigo": "81",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Digitação contínua?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "180",
                "codigo": "82",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Telemarketing\/Call center?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "181",
                "codigo": "83",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Esforço físico intenso?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "182",
                "codigo": "84",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Outros?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "183",
                "codigo": "85",
                "grupo_codigo": "RHMED_1",
                "enunciado": "OBS:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "184",
                "codigo": "106",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Assinatura do Funcionário",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "185",
                "codigo": "237",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Digitação contínua?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "186",
                "codigo": "238",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Telemarketing\/Call center?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "187",
                "codigo": "208",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Esforço físico intenso?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "188",
                "codigo": "209",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Outros?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "189",
                "codigo": "236",
                "grupo_codigo": "RHMED_1",
                "enunciado": "OBS:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "190",
                "codigo": "241",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Data",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "212",
                "codigo": "242",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Assinatura do Funcionário",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "224",
                "codigo": "224",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Músculo Esquelético - Membros Inferiores",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "225",
                "codigo": "235",
                "grupo_codigo": "RHMED_1",
                "enunciado": "11 - Músculo Esquelético - Membros Superiores",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "226",
                "codigo": "225",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Músculo Esquelético - Coluna Vertebral",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "227",
                "codigo": "231",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Manobras Tinel",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo"
              },
              {
                "id": "228",
                "codigo": "232",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Manobra Phalen ",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo"
              },
              {
                "id": "229",
                "codigo": "233",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Manobra Filkenstein",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo "
              },
              {
                "id": "230",
                "codigo": "226",
                "grupo_codigo": "RHMED_1",
                "enunciado": "É deficiente físico?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "231",
                "codigo": "227",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Qual deficiência?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "232",
                "codigo": "234",
                "grupo_codigo": "RHMED_1",
                "enunciado": "OBS MÉDICAS",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "233",
                "codigo": "228",
                "grupo_codigo": "RHMED_1",
                "enunciado": "OBS MÉDICAS",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "234",
                "codigo": "230",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Médico Examinador\/ Carimbo \/ CRM",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "235",
                "codigo": "229",
                "grupo_codigo": "RHMED_1",
                "enunciado": "Conclusão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Apto, Inapto"
              }
            ]
          }
        }
      ],
      "2": [
        {
          "id": "5",
          "nome": "ANTECEDENTES PESSOAIS (Problemas de Saúde - Anteriores e Atuais)",
          "grupo_codigo": "RHMED_2",
          "posicao": "2",
          "codigo_empresa": "414531",
          "questions": {
            "1": [
              {
                "id": "20",
                "codigo": "12",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Pressão Alta?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "21",
                "codigo": "13",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças do coração?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "24",
                "codigo": "14",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas respiratórios (bronquite, asma, turberculose)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "26",
                "codigo": "15",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças nos rins?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "28",
                "codigo": "16",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças no fígado?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "30",
                "codigo": "17",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Epilepsia, convulsão?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "31",
                "codigo": "18",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças no estômago (úlcera, gastrite)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "32",
                "codigo": "19",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Alteração no Sangue (anemia, leucopenia)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "33",
                "codigo": "20",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas de Visão?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "34",
                "codigo": "21",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas de audição (otite, zumbido, perda)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "35",
                "codigo": "22",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Depressão, melancolia, nervosismo, pânico?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "36",
                "codigo": "23",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Câncer?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "37",
                "codigo": "24",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Diabete (açúcar no sangue)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "38",
                "codigo": "25",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças de pele?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "39",
                "codigo": "26",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Reumatismo?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "40",
                "codigo": "27",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças de coluna, hérnia de disco?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "41",
                "codigo": "109",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Hérnia inguinal, escrotal, umbilical?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "42",
                "codigo": "28",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas com a voz (rouquidão, fenda, calo)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "43",
                "codigo": "29",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Dor nas articulações da mão, punho, cotovelo ou braços?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "44",
                "codigo": "30",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Alterações na tireóide?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "45",
                "codigo": "31",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Fraturas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "46",
                "codigo": "32",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Varizes?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "47",
                "codigo": "33",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Tonturas ou desmaios?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "48",
                "codigo": "34",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Dor de cabeça frequente?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "49",
                "codigo": "35",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Vacina antitetânica atualizada (a cada 10 anos)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "50",
                "codigo": "36",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Possui vacina para Hepatite B atualizada (3 doses)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "51",
                "codigo": "38",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "52",
                "codigo": "37",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Possui alguma deficiência?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "53",
                "codigo": "40",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "54",
                "codigo": "39",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Sofreu alguma doença não mencionada?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "55",
                "codigo": "42",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "56",
                "codigo": "41",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Já esteve internado alguma vez?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "57",
                "codigo": "43",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Cirurgias realizadas ou programadas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "58",
                "codigo": "44",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "59",
                "codigo": "45",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Suas condições de saúde exigem trabalho especial?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "60",
                "codigo": "46",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "61",
                "codigo": "47",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Esteve afastado pelo INSS?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "62",
                "codigo": "48",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Motivo:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "63",
                "codigo": "243",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Antecedentes de Alergia?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "64",
                "codigo": "244",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Se sim, qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "65",
                "codigo": "251",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Você está bem de saúde? ",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "66",
                "codigo": "49",
                "grupo_codigo": "RHMED_2",
                "enunciado": "OBS:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "67",
                "codigo": "128",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Pressão Alta?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "71",
                "codigo": "129",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças do coração?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "73",
                "codigo": "130",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas respiratórios (bronquite, asma, turberculose)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "78",
                "codigo": "131",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças nos rins?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "79",
                "codigo": "132",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças no fígado?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "85",
                "codigo": "133",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Epilepsia, convulsão?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "92",
                "codigo": "134",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças no estômago (úlcera, gastrite)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "94",
                "codigo": "135",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Alteração no Sangue (anemia, leucopenia)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "96",
                "codigo": "136",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas de Visão?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "97",
                "codigo": "137",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas de audição (otite, zumbido, perda)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "100",
                "codigo": "138",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Depressão, melancolia, nervosismo, pânico?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "102",
                "codigo": "139",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Câncer?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "104",
                "codigo": "140",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Diabete (açúcar no sangue)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "106",
                "codigo": "141",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças de pele?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "108",
                "codigo": "142",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Reumatismo?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "110",
                "codigo": "143",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Doenças de coluna, hérnia de disco?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "112",
                "codigo": "144",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Hérnia inguinal, escrotal, umbilical?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "113",
                "codigo": "167",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Problemas com a voz (rouquidão, fenda, calo)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "115",
                "codigo": "168",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Dor nas articulações da mão, punho ou braços?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "116",
                "codigo": "169",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Alterações na tireóide?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "117",
                "codigo": "170",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Fraturas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Sim, Não"
              },
              {
                "id": "119",
                "codigo": "245",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Antecedentes de Alergia?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "120",
                "codigo": "246",
                "grupo_codigo": "RHMED_2",
                "enunciado": "Se sim, qual?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              }
            ]
          }
        }
      ],
      "3": [
        {
          "id": "6",
          "nome": "ESTILO DE VIDA (Em caso afirmativo, responda)",
          "grupo_codigo": "RHMED_3",
          "posicao": "3",
          "codigo_empresa": "414531",
          "questions": {
            "1": [
              {
                "id": "68",
                "codigo": "50",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Atividade Física Regular?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "69",
                "codigo": "51",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Diariamente, 3 ou 4 vezes, Finais de Semana"
              },
              {
                "id": "70",
                "codigo": "52",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Fuma?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "72",
                "codigo": "53",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " 1 a 3 cigarros\/dia, de 4 a 20 cigarros\/dia, Acima de 20 cigarros\/dia"
              },
              {
                "id": "74",
                "codigo": "54",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Bebidas alcoólicas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "75",
                "codigo": "55",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Finais de Semana, 3 a 4 vezes na semana, Diariamente"
              },
              {
                "id": "76",
                "codigo": "56",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Problemas com o sono?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "77",
                "codigo": "57",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Insônia, mas acorda bem disposto(a), Insônia, e acordo cansado(a)"
              },
              {
                "id": "80",
                "codigo": "59",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Resultado Normal, Resultado Alterado"
              },
              {
                "id": "81",
                "codigo": "58",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Exame de Colesterol em 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "82",
                "codigo": "63",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antidepressivos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "83",
                "codigo": "61",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Tranquilizantes",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "84",
                "codigo": "66",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Analgésicos\/Antiinflamatórios",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "86",
                "codigo": "64",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Anticonvulsivantes",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "87",
                "codigo": "62",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antialérgicos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "88",
                "codigo": "60",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Uso regular de medicamentos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "89",
                "codigo": "65",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antihipertensivos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "90",
                "codigo": "67",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Encontra-se estressado(a)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "91",
                "codigo": "68",
                "grupo_codigo": "RHMED_3",
                "enunciado": ".",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Baixo Estresse, Médio Estresse, Alto Estresse"
              },
              {
                "id": "93",
                "codigo": "69",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Motivo do estresse?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Familiar, Trabalho, Familiar e Trabalho"
              },
              {
                "id": "95",
                "codigo": "70",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Como considera sua alimentação?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Saudável, Regular, Não saudável"
              },
              {
                "id": "98",
                "codigo": "71",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Consumo de água\/liquidos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Acima de 9 copos\/dia, de 5 a 8 copos\/dia, Até 4 copos\/dia"
              },
              {
                "id": "99",
                "codigo": "112",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Dentista - revisão\/tratamento",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Nos últimos 12 meses , de 12 a 24 meses , Há mais de 24 meses "
              },
              {
                "id": "101",
                "codigo": "72",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Preventivo Ginecológico atualizado?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "103",
                "codigo": "73",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Mamografia ou Ultrassom das mamas em 2 anos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "105",
                "codigo": "74",
                "grupo_codigo": "RHMED_3",
                "enunciado": "É gestante?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "107",
                "codigo": "75",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Data da Última Menstruação",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "109",
                "codigo": "86",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Próstata - exame (toque) nos últimos 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "111",
                "codigo": "87",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Próstata - exame de sangue (PSA) nos últimos 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "114",
                "codigo": "88",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Hidrocele\/Varicocele?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " SIM, NÃO"
              },
              {
                "id": "118",
                "codigo": "257",
                "grupo_codigo": "RHMED_3",
                "enunciado": "OBS:",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "139",
                "codigo": "171",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Atividade Física Regular?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "140",
                "codigo": "172",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Diariamente, 3 ou 4 vezes, Finais de Semana"
              },
              {
                "id": "141",
                "codigo": "173",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Fuma?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "142",
                "codigo": "174",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " 1 a 3 cigarros\/dia, de 4 a 20 cigarros\/dia, Acima de 20 cigarros\/dia"
              },
              {
                "id": "143",
                "codigo": "175",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Bebidas alcoólicas?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "144",
                "codigo": "176",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Finais de Semana, 3 a 4 vezes na semana, Diariamente"
              },
              {
                "id": "145",
                "codigo": "177",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Problemas com o sono?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "146",
                "codigo": "178",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Insônia, mas acorda bem disposto(a), Insônia, e acordo cansado(a)"
              },
              {
                "id": "147",
                "codigo": "179",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Exame de Colesterol em 12 meses?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "148",
                "codigo": "180",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Resultado Normal, Resultado Alterado"
              },
              {
                "id": "149",
                "codigo": "181",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Uso regular de medicamentos?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "150",
                "codigo": "182",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Tranquilizantes",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "151",
                "codigo": "183",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antialérgicos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "152",
                "codigo": "184",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antidepressivos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "153",
                "codigo": "185",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Anticonvulsivantes",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "154",
                "codigo": "186",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Antihipertensivos",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "155",
                "codigo": "187",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Analgésicos\/Antiinflamatórios",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Item 1, Item 2, Item 3"
              },
              {
                "id": "156",
                "codigo": "188",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Encontra-se estressado(a)?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "157",
                "codigo": "189",
                "grupo_codigo": "RHMED_3",
                "enunciado": "NULL",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Baixo Estresse, Médio Estresse, Alto Estresse"
              },
              {
                "id": "158",
                "codigo": "190",
                "grupo_codigo": "RHMED_3",
                "enunciado": "Motivo do estresse?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Familiar, Trabalho, Familiar e Trabalho"
              }
            ]
          }
        }
      ],
      "4": [
        {
          "id": "7",
          "nome": "EXAME FÍSICO",
          "grupo_codigo": "RHMED_4",
          "posicao": "4",
          "codigo_empresa": "414531",
          "questions": {
            "1": [
              {
                "id": "191",
                "codigo": "89",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Cabeça e Pescoço",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "192",
                "codigo": "90",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Coração",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "193",
                "codigo": "91",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Pulmão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "194",
                "codigo": "92",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Pele",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "195",
                "codigo": "93",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Inspeção Dentária (NR 30)",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "196",
                "codigo": "94",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Teste de Roomberg",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "197",
                "codigo": "95",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Abdômem",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "198",
                "codigo": "96",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Visão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "199",
                "codigo": "97",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Inspeção Mental",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "200",
                "codigo": "98",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Audição",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "201",
                "codigo": "99",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Músculo Esquelético - Membros Superiores",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "202",
                "codigo": "100",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Músculo Esquelético - Membros Inferiores",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "203",
                "codigo": "101",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Músculo Esquelético - Coluna Vertebral",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "204",
                "codigo": "113",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Manobras Tinel",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo"
              },
              {
                "id": "205",
                "codigo": "114",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Manobra Phalen ",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo"
              },
              {
                "id": "206",
                "codigo": "115",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Manobra Filkenstein ",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Positivo, Negativo"
              },
              {
                "id": "207",
                "codigo": "102",
                "grupo_codigo": "RHMED_4",
                "enunciado": "É deficiente físico?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "208",
                "codigo": "103",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Qual deficiência?",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "209",
                "codigo": "104",
                "grupo_codigo": "RHMED_4",
                "enunciado": "OBS MÉDICAS",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "210",
                "codigo": "108",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Médico Examinador\/ Carimbo \/ CRM",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": "NULL"
              },
              {
                "id": "211",
                "codigo": "107",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Conclusão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Apto, Inapto"
              },
              {
                "id": "213",
                "codigo": "213",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Cabeça e Pescoço",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "214",
                "codigo": "214",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Coração",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "215",
                "codigo": "215",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Pulmão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "216",
                "codigo": "216",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Pele",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "217",
                "codigo": "217",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Inspeção Dentária (NR 30)",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "218",
                "codigo": "218",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Teste de Roomberg",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "219",
                "codigo": "219",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Abdômem",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado "
              },
              {
                "id": "220",
                "codigo": "220",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Visão",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado "
              },
              {
                "id": "221",
                "codigo": "221",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Inspeção Mental",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "222",
                "codigo": "222",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Audição",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              },
              {
                "id": "223",
                "codigo": "223",
                "grupo_codigo": "RHMED_4",
                "enunciado": "Músculo Esquelético - Membros Superiores",
                "codigo_empresa": "414531",
                "obrigatorio": "0",
                "posicao": "1",
                "tipo_campo": "radio",
                "arr": " Normal, Alterado"
              }
            ]
          }
        }
      ]
    }
  }),
  image: foto => `https://via.placeholder.com/496x701`,
  resposta: async (usuario_id, caixa, documento, pergunta_codigo, value) => ({
    "next": true,
    "message": "resposta registrada"
  }),
  cancel: async (caixa, documento) => ({
    "next": true,
    "message": "cancelado com sucesso"
  })
}

const relatorio = {
  get: async () => ({
    total_registros: 200000,
    total_terminados: 1700,
    total_operadores: 47,
    calendario_producao: [
      { data: '12/04', total_resgistrado: 400, total_terminados: 270 },
      { data: '13/04', total_resgistrado: 580, total_terminados: 533 },
      { data: '14/04', total_resgistrado: 630, total_terminados: 622 },
      { data: '15/04', total_resgistrado: 271, total_terminados: 268 },
      { data: '16/04', total_resgistrado: 487, total_terminados: 400 },
      { data: '17/04', total_resgistrado: 625, total_terminados: 600 },
      { data: '18/04', total_resgistrado: 333, total_terminados: 333 },
      { data: '19/04', total_resgistrado: 301, total_terminados: 280 },
      { data: '20/04', total_resgistrado: 200, total_terminados: 170 },
      { data: '21/04', total_resgistrado: 500, total_terminados: 250 },
      { data: '22/04', total_resgistrado: 653, total_terminados: 372 },
    ]
  })
}

export { auth, fila, relatorio }