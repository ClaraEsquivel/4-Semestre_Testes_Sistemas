package br.com.example.demo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class CalculadoraTest {
    @Test
        public void somaDoisNumeros(){
            Calculadora calculadora = new Calculadora();
            int soma = calculadora.soma(2, 3);
            System.out.println(soma);
            assertEquals(5, soma);

        }

        @Test
        public void divisaoDoisNumeros(){
            Calculadora calculadora = new Calculadora();
            int divisao = calculadora.divisao(10, 2);
            System.out.println(divisao);
            assertEquals(5, divisao);
        }
}
