var UrlGetPedidos = 'http://localhost:80/G5_20/controller/pedidos.php?op=GetPedidos';
var UrlPostPedidos = 'http://localhost:80/G5_20/controller/pedidos.php?op=InsertPedidos';
var UrlGetUno = 'http://localhost:80/G5_20/controller/pedidos.php?op=GetUno';
var UrlPutPedidos = 'http://localhost:80/G5_20/controller/pedidos.php?op=UpdatePedidos';
var UrlDeletePedidos = 'http://localhost:80/G5_20/controller/pedidos.php?op=DeletePedidos';

$(document).ready(function(){
    CargarPedidos();
}); 

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var valores = '';

            for (i=0; i<MiItems.length; i++){
                valores += '<tr>'+
                '<td>' +MiItems[i].ID + '</td>'+
                '<td>' +MiItems[i].IDSOCIO + '</td>'+
                '<td>' +MiItems[i].FECHA_PEDIDO + '</td>'+
                '<td>' +MiItems[i].DETALLE + '</td>'+
                '<td>' +MiItems[i].SUBTOTAL + '</td>'+
                '<td>' +MiItems[i].TOTAL_ISV + '</td>'+
                '<td>' +MiItems[i].TOTAL + '</td>'+
                '<td>' +MiItems[i].FECHA_ENTREGA + '</td>'+
                '<td>' +MiItems[i].ESTADO + '</td>'+
                '<td>' +
                '<button class="btn btn-outline-warning" onclick="CargarPedidos('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarPedidos('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.pedidos').html(valores);
            }
        }
    });
}

function AgregarPedidos(){
    var datospedidos = {
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUBTOTAL: $('#SUBTOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidosjson =JSON.stringify(datospedidos);
    
    $.ajax({
        url: UrlPostPedidos,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json', 
        success: function(response){
                console.log(response);
        }
    });
    alert("Pedido Agregado");
}

function CargarPedido1(idpedido){
    var datospedidos = {
        id: idpedido
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItem[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItem[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItem[0].DETALLE);
            $('#SUB_TOTAL').val(MiItem[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItem[0].TOTAL_ISV);
            $('#TOTAL').val(MiIteM[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItem[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItem[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+MiItems[0].ID+')"'+
            'value="Actualizar Pedido" class= "btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarPedidos(idpedidos){
    var datospedidos = {
        id:idpedidos,
        ID_SOCIO: $('ID_SOCIO').val(),
        FECHA_PEDIDO: $('FECHA_PEDIDO').val(),
        DETALLE: $('DETALLE').val(),
        SUB_TOTAL: $('SUB_TOTAL').val(),
        TOTAL_ISV: $('TOTAL_ISV').val(),
        TOTAL: $('TOTAL').val(),
        FECHA_ENTREGA: $('FECHA_ENTREGA').val(),
        ESTADO: $('ESTADO').val()
    };
    var datospedidosjson =JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPutPedidos,
        type: 'PUT',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}

function EliminarPedidos(idpedidos){
    var datospedidos= {
        id:idpedidos
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlDeletePedidos,
        type: 'DELETE',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}