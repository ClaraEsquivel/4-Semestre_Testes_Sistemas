function Formulario({botao}){
    return(
        <form>
            <input type='text' placeholder="Nome" className="form-control"/>
            <input type='text' placeholder="Marca" className="form-control"/>
        {
            botao
            ?
            <input type="button" value="Cadastrar" className="bnt bnt-primary"/>
            :
            <div>
                <input type="button" value="Alterar" className="bnt bnt-warning"/>
                <input type="button" value="Remover" className="bnt bnt-danger"/>
                <input type="button" value="Cancelar" className="bnt bnt-secondary"/>
            </div>
        }
        </form>
    )
}

export default Formulario;