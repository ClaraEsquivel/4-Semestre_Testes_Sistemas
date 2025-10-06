package br.com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

public class UsuarioTest {
    @Test
    public void testCriarUsuarioValido(){
        Usuario u = new Usuario("Anderson");
        assertEquals("Anderson", u.getNome());
    }

    @Test
    public void testCriarUsuarioNomeInvalido(){
        Exception e = assertThrows
        (IllegalArgumentException.class,
            () -> new Usuario(""));
        assertEquals("Nome Inválido", e.getMessage());
    }
}
