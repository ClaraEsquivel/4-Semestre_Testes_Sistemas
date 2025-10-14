package br.com.example.tdd2;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

public class CalculadoraTest {

    @Test
    void testSomar() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(5, 3);
        assertEquals(8, resultado);
    }

    @Test
    void testSubtrair() {
        Calculadora calc = new Calculadora();
        int resultado = calc.subtrair(10, 4);
        assertEquals(6, resultado);
    }

    @Test
    void testMultiplicar() {
        Calculadora calc = new Calculadora();
        int resultado = calc.multiplicar(3, 7);
        assertEquals(21, resultado);
    }

    @Test
    void testDividir() {
        Calculadora calc = new Calculadora();
        int resultado = calc.dividir(10, 2);
        assertEquals(5, resultado);
    }

    @Test
    void testDividirPorZero() {
        Calculadora calc = new Calculadora();
        Exception e = assertThrows(IllegalArgumentException.class,
            () -> calc.dividir(10, 0));
        assertEquals("Não é possível dividir por zero", e.getMessage());
    }
}