package com.restauranteMexicano.App.Servicios;

import java.util.List;

import com.restauranteMexicano.App.model.Producto;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */
public interface ServicioProducto {
    List<Producto> ConsultarProductos();

    Producto ConsultarProducto(Integer id);

    void ActualizarProducto(Producto producto);
    
}
