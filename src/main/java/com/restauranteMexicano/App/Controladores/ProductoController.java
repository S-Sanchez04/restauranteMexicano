package com.restauranteMexicano.App.Controladores;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.restauranteMexicano.App.JavaMappers.ProductoMapper;
import com.restauranteMexicano.App.Servicios.ServicioProxyImpl;
import com.restauranteMexicano.App.model.Producto;

/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */

@RestController
@RequestMapping("/Producto")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ProductoController {
 
    @Autowired
    private ProductoMapper productoMapper;
    @Autowired
    private ServicioProxyImpl servicioProxyImpl;

    public ProductoController(ProductoMapper productoMapper) {
        this.productoMapper = productoMapper;
    }

    @GetMapping("/ConsultarProductos/{clienteID}")
    public List<Producto> ConsultarProductos(@PathVariable("clienteID") Integer clienteID){
        return servicioProxyImpl.ConsultarProductos(clienteID);
    }

    @PostMapping("/CrearProducto")
    public ResponseEntity<Producto> CrearProducto(@RequestBody Producto producto){
        productoMapper.CrearProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }

    
    @GetMapping("/ConsultarProducto/{id}/{clienteID}")
    public Producto ConsultarProducto(@PathVariable("id") Integer id, @PathVariable("clienteID") Integer clienteID){
        return servicioProxyImpl.ConsultarProducto(id, clienteID);
    }

    @DeleteMapping("/EliminarProducto/{id}")
    public ResponseEntity<String> EliminarProducto(@PathVariable("id") Integer id){
        productoMapper.EliminarProducto(id);
        return ResponseEntity.ok("Producto eliminado correctamente");
    }

    @PutMapping("/ActualizarProducto")
    public ResponseEntity<Producto> ActualizarProducto(@RequestBody Producto producto){
        servicioProxyImpl.ActualizarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }
    
    @GetMapping("/ConsultarProductoPorPedido/{ID}")
    public List<Producto> ConsultarProductoPorPedido(@PathVariable("ID") Integer ID){
        return productoMapper.ConsultarProductoPorPedido(ID);
    }

}
