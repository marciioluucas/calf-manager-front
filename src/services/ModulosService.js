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
            nome: 'Cadastro de Animal',
            icone: '',
            link: {
              name: 'CadastroAnimal'
            }
          },
          {
            nome: 'Lista de Animais',
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
            nome: 'Cadastro de Fazenda',
            icone: '',
            link: {
              name: 'CadastroFazenda'
            }
          },
          {
            nome: 'Lista de Fazendas',
            icone: '',
            link: {
              name: 'ListagemFazenda'
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
            nome: 'Cadastro de Usuários',
            icone: '',
            link: {
              name: 'CadastroUsuario'
            }
          },
          {
            nome: 'Lista de Usuários',
            icone: '',
            link: {
              name: 'ListagemUsuario'
            }
          },
          {
            nome: 'Cadastro de Grupos',
            icone: '',
            link: {
              name: 'CadastroGrupo'
            }
          },
          {
            nome: 'Lista de Grupos',
            icone: '',
            link: {
              name: 'ListagemGrupo'
            }
          },
          {
            nome: 'Cadastro de Permissões',
            icone: '',
            link: {
              name: 'CadastroPermissao'
            }
          },
          {
            nome: 'Lista de Permissões',
            icone: '',
            link: {
              name: 'ListagemPermissao'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Lote',
        breve_descricao: 'Lote de animais',
        link: '',
        filhos: [
          {
            nome: 'Cadastro de Lote',
            icone: '',
            link: {
              name: 'CadastroLote'
            }
          },
          {
            nome: 'Lista de Lotes',
            icone: '',
            link: {
              name: 'ListagemLote'
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
            nome: 'Pesagem de Animais',
            icone: '',
            link: {
              name: 'Pesagem'
            }
          },
          {
            nome: 'Gráfico de pesagens',
            icone: '',
            link: {
              name: 'ListagemPesagem'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Enfermaria',
        breve_descricao: 'Enfermaria',
        link: '',
        filhos: [
          {
            nome: 'Animais',
            icone: '',
            link: {
              name: 'ListagemEnfermaria'
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
            nome: 'Sanidade Animal',
            icone: '',
            link: {
              name: 'CadastroDose'
            }
          },
          {
            nome: 'Entrada de Medicamentos',
            icone: '',
            link: {
              name: 'CadastroEntradaDose'
            }
          },
          {
            nome: 'Lista de Medicamentos/Vacinas aplicados',
            icone: '',
            link: {
              name: 'ListagemDose'
            }
          },
          {
            nome: 'Movimentação de Medicamentos/Vacinas',
            icone: '',
            link: {
              name: 'ListagemMovimentacao'
            }
          },
          {
            nome: 'Registrar Exame',
            icone: '',
            link: {
              name: 'CadastroHemograma'
            }
          },
          {
            nome: 'Resultado de exames',
            icone: '',
            link: {
              name: 'ListagemHemograma'
            }
          },
          {
            nome: 'Lista de exames',
            icone: '',
            link: {
              name: 'ListaHemograma'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Doenças',
        breve_descricao: 'Controle de doenças',
        link: '',
        filhos: [
          {
            nome: 'Cadastro de Doença',
            icone: '',
            link: {
              name: 'CadastroDoenca'
            }
          },
          {
            nome: 'Lista de Doenças',
            icone: '',
            link: {
              name: 'ListagemDoenca'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Medicamento',
        breve_descricao: 'Controle de medicamentos',
        link: '',
        filhos: [
          {
            nome: 'Cadastro de Medicamento/Vacina',
            icone: '',
            link: {
              name: 'CadastroMedicamento'
            }
          },
          {
            nome: 'Lista de Medicamentos/Vacinas',
            icone: '',
            link: {
              name: 'ListagemMedicamento'
            }
          }
        ]
      },
      {
        icone: 'bubble_chart',
        nome: 'Funcionário',
        breve_descricao: 'Controle de Funcionários e responsabilidades',
        link: '',
        filhos: [
          {
            nome: 'Cadastro de Pessoa',
            icone: '',
            link: {
              name: 'CadastroFuncionario'
            }
          },
          {
            nome: 'Lista de Funcionários',
            icone: '',
            link: {
              name: 'ListagemFuncionario'
            }
          },
          {
            nome: 'Cadastro de Cargos',
            icone: '',
            link: {
              name: 'CadastroCargo'
            }
          },
          {
            nome: 'Lista de Cargos',
            icone: '',
            link: {
              name: 'ListagemCargo'
            }
          }
        ]
      }
    ]
  }
}

export default ModulosService
