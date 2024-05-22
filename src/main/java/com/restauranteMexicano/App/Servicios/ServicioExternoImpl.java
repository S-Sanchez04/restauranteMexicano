package com.restauranteMexicano.App.Servicios;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restauranteMexicano.App.JavaMappers.ClienteMapper;
import com.restauranteMexicano.App.JavaMappers.PedidoMapper;
import com.restauranteMexicano.App.JavaMappers.ProductoMapper;
import com.restauranteMexicano.App.model.Cliente;
import com.restauranteMexicano.App.model.Externo;
import com.restauranteMexicano.App.model.Pedido;
import com.restauranteMexicano.App.model.Producto;
import com.restauranteMexicano.App.DTO.PedidoDTO;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */
@Service
public class ServicioExternoImpl {

    
    @Autowired
    private PedidoMapper pedidoMapper;
    @Autowired
    private ClienteMapper clienteMapper;
    @Autowired
    private ProductoMapper productoMapper;
    @Autowired
    private ServicioClienteImpl servicioClienteImpl;

    public void CrearPedido(Externo externo) {
        Pedido pedido = convierteAPedido(externo);
        PedidoDTO pedidoDTO = convierteAPedidoDTO(pedido);
        pedidoMapper.CrearPedido(pedidoDTO);
    }

    public PedidoDTO convierteAPedidoDTO(Pedido pedido){
        PedidoDTO pedidoDTO = new PedidoDTO();
        Cliente cliente = clienteMapper.ConsultarCliente(pedido.getCliente().getID());

        List<Producto> productos = pedido.getProductos();
        Boolean esPremium = servicioClienteImpl.LicenciaValida(cliente.getLicencia());
        Float totalP = 0f;
        pedidoDTO.setTarifaDomicilio(0);
        if(!esPremium){
            pedidoDTO.setTarifaDomicilio(3500);
            totalP += 3500;
        }
        for(Producto p: productos){
            Producto productoStock = productoMapper.ConsultarProducto(p.getID());
            if(p.getCantidad() > 0 && p.getCantidad() <= productoStock.getCantidad()){
                totalP += p.getPrecio() * p.getCantidad();
            }
        }
        pedidoDTO.setClienteID(pedido.getCliente().getID());
        pedidoDTO.setTotal(totalP);
        return pedidoDTO;
    }

    public Pedido convierteAPedido(Externo externo){
        Cliente cliente = clienteMapper.ConsultarCliente(externo.getIdCliente());
        List<Producto> productos = new ArrayList<Producto>();
        for(int i=0; i< externo.getCantidades().size(); i++){
            Producto producto = productoMapper.ConsultarProducto(externo.getIdProductos().get(i));
            producto.setCantidad(externo.getCantidades().get(i));
            productos.add(producto);
        }
        Pedido pedido = new Pedido(cliente, productos, 0f);
        return pedido;
    }


}

