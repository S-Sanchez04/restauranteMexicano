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
    public void CrearPedido(PedidoDTO pedidoDTO) {
        pedidoMapper.CrearPedido(pedidoDTO);
    }

    @Override
    public void EliminarPedido(Integer id){
        pedidoMapper.EliminarPedido(id);
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

