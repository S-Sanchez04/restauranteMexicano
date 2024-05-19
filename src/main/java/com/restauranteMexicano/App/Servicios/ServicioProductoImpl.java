package com.restauranteMexicano.App.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restauranteMexicano.App.JavaMappers.ProductoMapper;
import com.restauranteMexicano.App.model.Producto;

@Service
public class ServicioProductoImpl implements ServicioProducto {

    @Autowired
    private ProductoMapper productoMapper;

    @Override
    public List<Producto> ConsultarProductos() {
        return productoMapper.ConsultarProductos();
    }
    
    @Override
    public Producto ConsultarProducto(Integer id) {
        return productoMapper.ConsultarProducto(id);
    }

    @Override
    public void ActualizarProducto(Producto producto) {
        productoMapper.ActualizarProducto(producto);
    }
    
}
