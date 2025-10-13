package br.com.example.tdd;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class ProdutoTest {

    @Test
    void testProdutoValido(){
        Produto p = new Produto("Notebook", 3500.00);
        assertEquals("Notebook", p.getNome());
        assertEquals(3500.0, p.getPreco());
    }
    
    @Test
    void testNomeInvalido(){
        Exception e = assertThrows(IllegalArgumentException.class,
            () -> new Produto ("", 1000.00));
        assertEquals("Nome inválido", e.getMessage());  
    }

    @Test
    void testPrecoInvalido(){
        Exception e = assertThrows(IllegalArgumentException.class,
            () -> new Produto ("Mouse", 0));
        assertEquals("Preço inválido", e.getMessage());  
    }
}
