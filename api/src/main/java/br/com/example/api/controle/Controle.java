package br.com.example.api.controle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.example.api.modelo.Pessoa;
import br.com.example.api.repositorio.Repositorio;

@RestController
public class Controle {

    @Autowired
    private Repositorio acao;

    //listar todas as pessoas
    @GetMapping("/api")
    public List<Pessoa> selecionar(){
        return acao.findAll();
    }

    //mostar pelo código
    @GetMapping("/api/{codigo}")
    public Pessoa selecionarPeloCodigo(@PathVariable int codigo){
        return acao.findByCodigo(codigo);
    }

    //método cadastrar
    @PostMapping("/api")
    public Pessoa cadastrar(@RequestBody Pessoa obj){
        return acao.save(obj);
    }

    //editar
    @PutMapping("/api")
    public Pessoa salvar(@RequestBody Pessoa obj){
        return acao.save(obj);
    }

    //deletar
    @DeleteMapping("/api/{codigo}")
    public void remover(@PathVariable int codigo){
        Pessoa obj = acao.findByCodigo(codigo);
        acao.delete(obj);
    }

//--------------------------------------------------------------------------------
    //primeira rota
    @GetMapping("")
    public String mensagem(){
        return "Olá Mundo!";
    }

    //segunda rota
    @GetMapping("/boasVindas")
    public String boasVindas(){
        return "Seja bem-vindo(a)!";
    }

    //terceira rota
    @GetMapping("/boasVindas/{nome}")
    public String boasVindas(@PathVariable String nome){
        return "Seja bem-vindo(a)! "+nome;
    }
    


}
