package com.restauranteMexicano.App.Controladores;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.restauranteMexicano.App.Servicios.ServicioExternoImpl;
import com.restauranteMexicano.App.model.Externo;

/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */

@RestController
@RequestMapping("/Externos")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ExternosController {
 

    @Autowired
    private ServicioExternoImpl servicioExternoImpl;

    @PostMapping("/CrearPedido")
    public ResponseEntity<Externo> CrearPedido(@RequestBody Externo externo){
        servicioExternoImpl.CrearPedido(externo);
        return ResponseEntity.status(HttpStatus.CREATED).body(externo);
    }



}
