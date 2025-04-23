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

