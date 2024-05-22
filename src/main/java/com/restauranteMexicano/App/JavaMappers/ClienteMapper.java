package com.restauranteMexicano.App.JavaMappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.restauranteMexicano.App.model.Cliente;
/**
    Diseño y arquitectura de software
    @author
        Santiago Sánchez Cárdenas - 0000271976
        Sergio Gabriel Nieto Meneses - 0000246107
        Mauricio Andres Valderrama Acosta - 0000251802

 */
@Mapper
public interface ClienteMapper {

    @Select("SELECT * FROM T_CLIENTES")
    List<Cliente> ConsultarClientes();

    @Select("SELECT * FROM T_CLIENTES WHERE ID = #{ID}")
    Cliente ConsultarCliente(@Param("ID") Integer ID);

    @Insert("INSERT INTO T_CLIENTES (ID, nombre, Licencia, Direccion) VALUES (#{ID}, #{nombre}, #{Licencia}, #{Direccion})")
    void CrearCliente(Cliente cliente);

    @Delete("DELETE FROM T_CLIENTES WHERE ID = #{id}")
    void EliminarCliente(@Param("id") Integer id);

    @Select("SELECT estadoPremium FROM T_LICENCIA WHERE licencia = #{licencia}")
    Boolean ConsultarLicencia(@Param("licencia") String licencia);
}
