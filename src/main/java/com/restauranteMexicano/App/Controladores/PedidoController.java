package com.restauranteMexicano.App.Controladores;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.restauranteMexicano.App.Servicios.ServicioPedidoImpl;
import com.restauranteMexicano.App.model.Pedido;

/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */

@RestController
@RequestMapping("/Pedido")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PedidoController {
 

    @Autowired
    private ServicioPedidoImpl servicioPedidoImpl;

    @GetMapping("/ConsultarPedidos")
    public List<Pedido> ConsultarPedidos(){
        return servicioPedidoImpl.ConsultarPedidos();
    }

    @PostMapping("/CrearPedido")
    public ResponseEntity<Pedido> CrearPedido(@RequestBody Pedido pedido){
        servicioPedidoImpl.CrearPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    
    @GetMapping("/ConsultarPedido/{id}")
    public Pedido ConsultarPedido(@PathVariable("id") Integer id){
        return servicioPedidoImpl.ConsultarPedido(id);
    }

}
