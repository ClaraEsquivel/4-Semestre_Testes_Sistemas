package br.com.example.demo;

public class Usuario {
    private String nome;

    public Usuario(String nome){
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome Inválido");
        }
        this.nome = nome;
    }

    public String getNome(){
        return nome;
    }
    
}
