package com.example.demo;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.*;

public class CalculadoraTest {
    @Test
    void testSomar(){
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(2, 3);
        assertEquals(5, resultado);
    }

}
