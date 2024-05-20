package com.restauranteMexicano.App.Controladores;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.restauranteMexicano.App.JavaMappers.ClienteMapper;
import com.restauranteMexicano.App.Servicios.ServicioClienteImpl;
import com.restauranteMexicano.App.model.Cliente;

/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */

@RestController
@RequestMapping("/Cliente")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ClienteController {
 
    private ClienteMapper clienteMapper;
    @Autowired
    private ServicioClienteImpl servicioClienteImpl;
    

    public ClienteController(ClienteMapper clienteMapper) {
        this.clienteMapper = clienteMapper;
    }

    @GetMapping("/ConsultarClientes")
    public List<Cliente> ConsultarClientes(){
        return clienteMapper.ConsultarClientes();
    }

    @PostMapping("/CrearCliente")
    public ResponseEntity<Cliente> CrearCliente(@RequestBody Cliente cliente){
        clienteMapper.CrearCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
    }

    
    @GetMapping("/ConsultarCliente/{id}")
    public Cliente ConsultarCliente(@PathVariable("id") Integer id){
        return servicioClienteImpl.consultarCliente(id);
    }

    @GetMapping("/ConsultarLicencia/{Licencia}")
    public Boolean ConsultarLicencia(@PathVariable("Licencia") String Licencia){
        return servicioClienteImpl.LicenciaValida(Licencia);
    }
    

    @DeleteMapping("/EliminarCliente/{id}")
    public ResponseEntity<String> EliminarCliente(@PathVariable("id") Integer id){
        clienteMapper.EliminarCliente(id);
        return ResponseEntity.ok("Cliente eliminado correctamente");
    }
    


}
