package com.restauranteMexicano.App.Servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restauranteMexicano.App.JavaMappers.ClienteMapper;
import com.restauranteMexicano.App.model.Cliente;

@Service
public class ServicioClienteImpl implements ServicioCliente {

    @Autowired
    ClienteMapper clienteMapper;

    @Override
    public Boolean LicenciaValida(String licencia) {
        Boolean licenciaValida = clienteMapper.ConsultarLicencia(licencia);
        return licenciaValida != null ? licenciaValida : false;
    }

    @Override
    public Cliente consultarCliente(Integer clienteID) {
        if(clienteID != null)
            return clienteMapper.ConsultarCliente(clienteID);
        else
            return null;
    }
}
