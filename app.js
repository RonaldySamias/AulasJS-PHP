class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] =='' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')
        if (id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

     gravar(d){
      //localStorage.setItem('despesa', JSON.stringify(d))
      let id = this.getProximoId()
      
      localStorage.setItem(id, JSON.stringify(d))
   
      localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
    
       let despesas = Array()


       let id = localStorage.getItem('id')

       for (let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null){
                cotinue
            }

            despesas.push(despesa)
       }

       return despesas
    }
    
    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesasFiltradas)

        if(despesa.ano != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)

        }

        if(despesa.mes != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)

        }

        if(despesa.dia != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)

        }

        if(despesa.descricao != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        }

        if(despesa.valor != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)

        }

        return despesasFiltradas


    }

    
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )


    if(despesa.validarDados()){
        bd.gravar(despesa)

        //Limpar campos//
        document.getElementById('ano').value = '';
        document.getElementById('mes').value = '';
        document.getElementById('dia').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';


        document.getElementById('sucessError').innerHTML = 'Registro inserido com sucesso'
        document.querySelector('.modal-body').innerHTML = 'Despesa foi cadastrada com sucesso'
        $('#modalGravacao').modal('show')

    }else{
        document.querySelector('.modal-header').classList.remove('text-success')
        document.querySelector('.modal-header').classList.add('text-danger')
        document.getElementById('sucessError').innerHTML = 'Erro ao cadastrar despesa'
        document.querySelector('.modal-body').innerHTML = 'Despesa não foi cadastrada, verifique se todos os campos estão preenchidos'
        document.querySelector('.modal-footer .btn').classList.remove('btn-success')
        document.querySelector('.modal-footer .btn').classList.add('btn-danger')
        document.querySelector('.modal-footer .btn').innerHTML = 'Voltar e corrigir'
        $('#modalGravacao').modal('show')    }
}

function carregaListaDespesa(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesas')


    despesas.forEach(function(a){
        let linha = listaDespesas.insertRow()
        console.log(linha)
        linha.insertCell(0).innerHTML = a.dia + '/' + a.mes + '/' + a.ano

        switch(a.tipo){
            case '1': a.tipo = 'Alimentação'
                break
            case '2': a.tipo = 'Educação'
                break
            case '3': a.tipo = 'Lazer'
                break
            case '4': a.tipo = 'Saúde'
                break
            case '5': a.tipo = 'Transporte'
                break    
        }
        
        linha.insertCell(1).innerHTML = a.tipo
        linha.insertCell(2).innerHTML = a.descricao
        linha.insertCell(3).innerHTML = a.valor
     
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(a){
        let linha = listaDespesas.insertRow()
        console.log(linha)
        linha.insertCell(0).innerHTML = a.dia + '/' + a.mes + '/' + a.ano

        switch(a.tipo){
            case '1': a.tipo = 'Alimentação'
                break
            case '2': a.tipo = 'Educação'
                break
            case '3': a.tipo = 'Lazer'
                break
            case '4': a.tipo = 'Saúde'
                break
            case '5': a.tipo = 'Transporte'
                break    
        }
        
        linha.insertCell(1).innerHTML = a.tipo
        linha.insertCell(2).innerHTML = a.descricao
        linha.insertCell(3).innerHTML = a.valor
     
    })

}