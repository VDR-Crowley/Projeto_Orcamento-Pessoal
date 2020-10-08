// Contrução do objeto

class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(var i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}

}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarListaDespesas() {

		// Array despesas
		let despesas =  new Array

		let id = localStorage.getItem('id')

		// Recupera todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			// Recupera despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			// Existe a possibilidade de haver indices que foram removidos
			// neste caso deve pular o indice
			if(despesa === null) {
				continue
			}

			despesas.push(despesa)
		}
		return despesas
	}	

}

let bd = new Bd()

// Construção das funções
function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	// instanciando o objeto em uma variavel
	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)


	if(despesa.validarDados()) {
		
		// Gravação despesa
		bd.gravar(despesa)
		
		// Titulo
		document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso!'
		document.getElementById('titulo_modal_div').className = 'modal-header text-success'
		// Descrição
		document.getElementById('descricaoModal').innerHTML = 'Despesa foi cadastrada com sucesso'
		// Botão
		document.getElementById('botaoModal').innerHTML = 'Voltar'
		document.getElementById('botaoModal').className = 'btn btn-success'

		// Dailog de sucesso
		$('#modalRegistraDespesa').modal('show')
		
		// Limpa os campo
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		
		// Titulo
		document.getElementById('modalTitulo').innerHTML = 'Erro ao inserir os dados!'
		document.getElementById('titulo_modal_div').className = 'modal-header text-danger'
		// Descrição
		document.getElementById('descricaoModal').innerHTML = 'Erro na gravação, verifique se os campos foram preenchidos corretamente'
		// Botão
		document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'
		document.getElementById('botaoModal').className = 'btn btn-danger'

		// Dailog de erro
		$('#modalRegistraDespesa').modal('show')
	
	}

}


function carregaListaDespesas() {

	let despesas = new Array
	
	despesas = bd.recuperarListaDespesas()

	// Selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')

	// percorrer o array despesas listando cada despesa de forma dinâmica
	despesas.forEach(function(d) {
		console.log(d)
	  // Criando a linha tr
	  let linha = listaDespesas.insertRow()

	  // Criar coluna td
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		linha.insertCell(1).innerHTML = d.tipo

		// Ajustando tipo
		switch(parseInt(d.tipo)) {
			case 1: d.tipo = 'Alimentação'
				break
			case 2: d.tipo = 'Educação'
				break
			case 3: d.tipo = 'Lazer'
				break
			case 4: d.tipo = 'Saúde'
				break
			case 5: d.tipo = 'Transporte'
				break
		}
		
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

	})

}
