package com.restauranteMexicano.App.model;

import java.util.List;


import lombok.Data;


@Data
public class Externo {
    private Integer idCliente;
    private List<Integer> idProductos;
    private List<Integer> cantidades;
    
}
