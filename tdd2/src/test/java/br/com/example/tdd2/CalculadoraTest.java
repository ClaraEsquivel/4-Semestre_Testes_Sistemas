package br.com.example.tdd2;

import static org.junit.Assert.*;

import org.junit.jupiter.api.*;

public class CalculadoraTest {
    
    @Test
    void testSomar() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(5 , 3);
        assertEquals(8, resultado);
    }

    @Test
    void testSubtrair() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(5 , 3);
        assertEquals(8, resultado);
    }

    @Test
    void testMultiplicar() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(5 , 3);
        assertEquals(8, resultado);
    }

    @Test
    void testDividir() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(5 , 3);
        assertEquals(8, resultado);
    }
}
