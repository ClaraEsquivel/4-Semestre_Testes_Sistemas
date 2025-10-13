package com.example.demo;

// public class ValidadorSenha {
//     public boolean validar(String senha) {
//         if (senha != null && senha.length() < 8){
//             return false;
//         } // Verifica se a senha tem pelo menos 8 caracteres
        
//         if (!senha.matches(".*[A-Z].*")) {
//             return false;
//         } // Verifica se a senha contém pelo menos uma letra maiúscula

//         if (!senha.matches(".*\\d.*")) {
//             return false;
//         } // Verifica se a senha contém pelo menos um número

//         return true;
        
//     }
// }

public class ValidadorSenha{
    public boolean validar(String senha){
        if (senha == null) return false;
        return senha.length() >= 8 && 
        senha.matches(".*[A-Z].*") && 
        senha.matches(".*\\d.*");
    }
}