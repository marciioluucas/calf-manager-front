const ModulosService = {
  getModulos: function () {
    return [
      {
        icone: 'bubble_chart',
        nome: 'Animais',
        breve_descricao: 'Controle de animais',
        link: '',
        filhos: [
          {
            nome: 'Cadastro',
            icone: '',
            link: {
              name: 'CadastroAnimal'
            }
          },
          {
            nome: 'Listagem',
            icone: '',
            link: {
              name: 'ListagemAnimal'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Fazendas',
        breve_descricao: 'Controle das fazendas',
        link: '',
        filhos: [
          {
            nome: 'Cadastro',
            icone: '',
            link: {
              name: 'CadastroFazenda'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Usuários',
        breve_descricao: 'Controle dos usuários',
        link: {
          name: ''
        },
        filhos: [
          {
            nome: 'Cadastro',
            icone: '',
            link: {
              name: ''
            }
          },
          {
            nome: 'Lista',
            icone: '',
            link: {
              name: 'ListaFazenda'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Ciclos',
        breve_descricao: 'Ciclo de vida do animais',
        link: '',
        filhos: [
          {
            nome: 'Cadastro',
            icone: '',
            link: {
              name: 'CicloVida'
            }
          },
          {
            nome: 'Lote',
            icone: '',
            link: {
              name: 'Lote'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Pesagem',
        breve_descricao: 'Pesagem dos animais',
        link: '',
        filhos: [
          {
            nome: 'Cadastro',
            icone: '',
            link: {
              name: 'Pesagem'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Laboratorio',
        breve_descricao: 'Laboratório clínico',
        link: '',
        filhos: [
          {
            nome: 'Laboratório',
            icone: '',
            link: {
              name: 'Laboratorio'
            }
          }
        ]
      }
    ]
  }
}

export default ModulosService
