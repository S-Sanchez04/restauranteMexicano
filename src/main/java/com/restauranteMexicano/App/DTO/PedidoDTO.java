package com.restauranteMexicano.App.DTO;


import lombok.Data;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */
@Data
public class PedidoDTO {

    private int ID;
    private int ClienteID;
    private float total;
    private float tarifaDomicilio;
}
