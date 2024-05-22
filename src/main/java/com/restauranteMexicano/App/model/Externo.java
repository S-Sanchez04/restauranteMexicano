package com.restauranteMexicano.App.model;

import java.util.List;


import lombok.Data;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */

@Data
public class Externo {
    private Integer idCliente;
    private List<Integer> idProductos;
    private List<Integer> cantidades;
    
}
