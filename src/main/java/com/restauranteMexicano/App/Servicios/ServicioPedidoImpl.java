package com.restauranteMexicano.App.Servicios;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restauranteMexicano.App.JavaMappers.ClienteMapper;
import com.restauranteMexicano.App.JavaMappers.PedidoMapper;
import com.restauranteMexicano.App.JavaMappers.ProductoMapper;
import com.restauranteMexicano.App.model.Cliente;
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
public class ServicioPedidoImpl implements ServicioPedido{

    
    @Autowired
    private PedidoMapper pedidoMapper;
    @Autowired
    private ClienteMapper clienteMapper;
    @Autowired
    private ProductoMapper productoMapper;
    @Autowired
    private ServicioClienteImpl servicioClienteImpl;

    @Override
    public List<Pedido> ConsultarPedidos()
    {
        List<PedidoDTO> pedidos = pedidoMapper.ConsultarPedidos();
        List<Pedido> pedidosChanged = new ArrayList<Pedido>();
        for (PedidoDTO pedidoDTO : pedidos)
        {
            Pedido pedido = cambiaPedidoDTO(pedidoDTO);
            pedidosChanged.add(pedido);
        }
        return pedidosChanged;
    }

    @Override
    public Pedido ConsultarPedido(Integer id) {
        PedidoDTO pedidoDTO = pedidoMapper.ConsultarPedido(id);
        Pedido pedido = cambiaPedidoDTO(pedidoDTO);
        return pedido;
    }

    @Override
    public void CrearPedido(Pedido pedido) {
        PedidoDTO pedidoDTO = convierteAPedidoDTO(pedido);
        pedidoMapper.CrearPedido(pedidoDTO);
        insertarProductoPorPedido(pedido, pedidoMapper.UltimoID());
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

    public void insertarProductoPorPedido(Pedido pedido, int PedidoID){
        for(Producto producto:pedido.getProductos()){
            Integer ProductoID = producto.getID();
            pedidoMapper.insertarPedidoProducto(PedidoID, ProductoID, producto.getCantidad());
            Producto productoStock = productoMapper.ConsultarProducto(ProductoID);
            Integer nuevaCantidad = productoStock.getCantidad() - producto.getCantidad();
            productoStock.setCantidad(nuevaCantidad);
            productoMapper.ActualizarProducto(productoStock);
        }
    }



    public Pedido cambiaPedidoDTO(PedidoDTO pedidoDTO){
        Cliente cliente = clienteMapper.ConsultarCliente(pedidoDTO.getClienteID());
        List<Producto> productos = productoMapper.ConsultarProductoPorPedido(pedidoDTO.getID());
        Boolean esPremium = servicioClienteImpl.LicenciaValida(cliente.getLicencia());
        Float totalP = 0f;
        if(!esPremium){
            totalP += 3500;
        }
        for (Producto producto : productos) {
            totalP += producto.getPrecio() * producto.getCantidad();
        }
        Pedido pedido = new Pedido(cliente, productos, totalP);
        pedido.setID(pedidoDTO.getID());
        pedido.setCliente(cliente);
        pedido.setProductos(productos);
        
        return pedido;
    }

}

