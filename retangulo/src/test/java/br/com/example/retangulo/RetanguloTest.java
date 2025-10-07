package br.com.example.retangulo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class RetanguloTest {
    @Test
        public void calculoDaArea(){
            Retangulo retangulo = new Retangulo(5 , 3);
            int calcularArea = retangulo.calcularArea();
            assertEquals(15, calcularArea);
        }

    @Test
        public void calculoDoPerimetro(){
            Retangulo retangulo = new Retangulo(5, 3);
            int calcularPerimetro = retangulo.calcularPerimetro();
            assertEquals(16, calcularPerimetro);
        }
}
