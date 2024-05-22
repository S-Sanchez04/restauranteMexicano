package com.restauranteMexicano.App.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restauranteMexicano.App.model.Cliente;
import com.restauranteMexicano.App.model.Producto;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */
@Service
public class ServicioProxyImpl implements ServicioProducto {

    @Autowired
    private ServicioProductoImpl servicioProductoImpl;
    @Autowired
    private ServicioClienteImpl servicioClienteImpl;

    private Cliente cargarCliente(Integer clienteID) {
        return servicioClienteImpl.consultarCliente(clienteID);
    }

    private Producto ajustarPrecios(Producto producto, Cliente cliente) {
        if (cliente != null && servicioClienteImpl.LicenciaValida(cliente.getLicencia())) {
            if (producto.getTieneDescuento()) {
                producto.setPrecio(producto.getPrecio() * 0.9f); 
            }
        }
        return producto;
    }

    public List<Producto> ConsultarProductos(Integer clienteID) {
        Cliente cliente = cargarCliente(clienteID);
        List<Producto> productos = servicioProductoImpl.ConsultarProductos();
        for (Producto producto : productos) {
            ajustarPrecios(producto, cliente);
        }
        return productos;
    }

    public Producto ConsultarProducto(Integer id, Integer clienteID) {
        Cliente cliente = cargarCliente(clienteID);
        Producto producto = servicioProductoImpl.ConsultarProducto(id);
        return ajustarPrecios(producto, cliente);
    }

    @Override
    public void ActualizarProducto(Producto producto) {
        servicioProductoImpl.ActualizarProducto(producto);
    }

    @Override
    public List<Producto> ConsultarProductos() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'ConsultarProductos'");
    }

    @Override
    public Producto ConsultarProducto(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'ConsultarProducto'");
    }
}
