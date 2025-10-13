package br.com.example.tdd;

public class Produto {
    private final String nome;
    private final double preco;

    public Produto(String nome, double preco){
        validarDados(nome, preco);
        this.nome = nome;
        this.preco = preco;
    }

    private void validarDados(String nome, double preco){
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome inválido");
        }

        if (preco <= 0) {
            throw new IllegalArgumentException("Preço inválido");
        }
    }

    public String getNome() {
        return nome;
    }
    
    public double getPreco() {
        return preco;
    }


    // public Produto(String nome, double preco){
    //     if (nome == null || nome.isBlank()) {
    //         throw new IllegalArgumentException("Nome inválido");
    //     }

    //     if (preco <= 0) {
    //         throw new IllegalArgumentException("Preço inválido");
    //     }
    //     this.nome = nome;
    //     this.preco = preco;
    // }

    // public String getNome() {
    //     return nome;
    // }

    // public double getPreco() {
    //     return preco;
    // }
    
}
