package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.*;

public class ValidadorSenhaTest {
    
    @Test
    void testSenhaValida(){
        ValidadorSenha validador = new ValidadorSenha();
        boolean resultado = validador.validar("Senha123");
        assertTrue(resultado, "A senha 'Senha123' deve ser válida");
    }

    @Test
    void testSenhaInvalida(){
        ValidadorSenha validador = new ValidadorSenha();
        boolean resultado = validador.validar("abc");
        assertFalse(resultado, "A senha 'abc' deve ser inválida");
    }
}
