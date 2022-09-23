const express = require('express');
const router = express.Router();

const con = require('./db');

//Listar los productos en pantalla de ventas
router.get('/', (req, res) => {
    let sql = "call SP_LISTAR_NOM_PRODUCTOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.get('/listar_usuarios', (req, res) => {
    let sql = "call SP_LIST_USERS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});









//Activar/desactivar los productos (api de prueba)
router.put('/act_prod', (req, res) => {

    try {

        const { VCOD_PROD, VIND } = req.body;
        const consulta = `call SP_DESACTIVAR_ACTIVAR_PRODUCTOS('${VCOD_PROD}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");
        });

    } catch (error) {


        res.send("0");
    }
});


//ingreso de nueva venta
router.post('/ingreso_venta', (req, res) => {

    try {

        const { VCODCLIENTE, VCODMETODO, VCODPRODUCTO, VCANTIDAD, VSUBTOTAL, VIMPUESTO, VTOTAL, VPUNTOS_COMPRA } = req.body;
        const consulta = `call SP_INSERT_VENTAS_DETALLEVENTAS('${VCODCLIENTE}','${VCODMETODO}','${VCODPRODUCTO}','${VCANTIDAD}','${VSUBTOTAL}','${VIMPUESTO}','${VTOTAL}','${VPUNTOS_COMPRA}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Venta realizada");
        });

    } catch (error) {


        res.send("0");
    }
});

router.post('/ingreso_rol', (req, res) => {

    try {
        const { VNOMBREROL, VINSERTCOMPRAS, VUPDATECOMPRAS, VSELECTCOMPRAS, VDELETECOMPRAS, VINSERTVENTAS, VUPDATEVENTAS, VSELECTVENTAS, VDELETEVENTAS, VINSERTINVENTARIOS, VUPDATEINVENTARIOS, VSELECTINVENTARIOS, VDELETEINVENTARIOS, VINSERTREPORTES, VUPDATEREPORTES, VSELECTREPORTES, VDELETEREPORTES, VINSERTSEGURIDAD, VUPDATESEGURIDAD, VSELECTSEGURIDAD, VDELETESEGURIDAD, VINSERTADMINISTRACION, VUPDATEADMINISTRACION, VSELECTADMINISTRACION, VDELETEADMINISTRACION, VINSERTPERSONAS, VUPDATEPERSONAS, VSELECTPERSONAS, VDELETEPERSONAS } = req.body;
        const consulta = `call SP_INSERTAR_ROLES('${VNOMBREROL}','${VINSERTCOMPRAS}','${VUPDATECOMPRAS}','${VSELECTCOMPRAS}','${VDELETECOMPRAS}','${VINSERTVENTAS}','${VUPDATEVENTAS}','${VSELECTVENTAS}','${VDELETEVENTAS}','${VINSERTINVENTARIOS}','${VUPDATEINVENTARIOS}','${VSELECTINVENTARIOS}','${VDELETEINVENTARIOS}','${VINSERTREPORTES}','${VUPDATEREPORTES}','${VSELECTREPORTES}','${VDELETEREPORTES}','${VINSERTSEGURIDAD}','${VUPDATESEGURIDAD}','${VSELECTSEGURIDAD}','${VDELETESEGURIDAD}','${VINSERTADMINISTRACION}','${VUPDATEADMINISTRACION}','${VSELECTADMINISTRACION}','${VDELETEADMINISTRACION}','${VINSERTPERSONAS}','${VUPDATEPERSONAS}','${VSELECTPERSONAS}','${VDELETEPERSONAS}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("rol ingresado");
        });

    } catch (error) {


        res.send("0");
    }
});

//Insert Reporte instantaneo
router.post('/reporte_instantaneo', (req, res) => {
    try {
        const { VTITULO, VTIPO, VFORMATO, VFECHA_DESDE, VFECHA_HASTA } = req.body;
        const consulta = `call SP_INSERT_REPORTE_INSTANTANEO('${VTITULO}','${VTIPO}','${VFORMATO}','${VFECHA_DESDE}','${VFECHA_HASTA}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("reporte insertado");
        });
    } catch (error) {
        res.send("0");
    }
});

/*------------------------------------apis para inventarios----------------------------------------*/
//Insert categorias
router.post('/insert_categorias', (req, res) => {
    try {
        const { VNOMBRE } = req.body;

        //console.log(req);
        const consulta = `call SP_INSERT_CATEGORIA('${VNOMBRE}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Categoria agregada");
        });
    } catch (error) {
        res.send("0");
    }
});

//select categorias
router.get('/listar_categorias', (req, res) => {
    let sql = "call SP_MOSTRAR_CATEGORIAS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

//update categorias
router.put('/upd_categoria', (req, res) => {

    try {

        const { VCOD_CATEGORIA, VNOMBRE } = req.body;
        const consulta = `call SP_UPDATE_CATEGORIAS(${VCOD_CATEGORIA},'${VNOMBRE}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Categoria actualizada");
        });

    } catch (error) {


        res.send("0");
    }
});

//desactivar/activar categorias
router.put('/del_categoria', (req, res) => {

    try {

        const { VCOD_CAT, VIND } = req.body;
        const consulta = `call SP_DESACTIVAR_ACTIVAR_CATEGORIAS(${VCOD_CAT},'${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");
        });

    } catch (error) {


        res.send("0");
    }
});

//insert productos
router.post('/insert_prod', (req, res) => {
    try {
        const { VNOMBRE, VPRECIO, VCOD_CATEGORIA, VPROD_PER } = req.body;
        const consulta = `call SP_INSERT_PRODUCTOS('${VNOMBRE}','${VPRECIO}', ${VCOD_CATEGORIA},'${VPROD_PER}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Producto agregado");
        });
    } catch (error) {
        res.send("0");
    }
});


//select productos
router.get('/listar_prod', (req, res) => {
    let sql = "call SP_MOSTRAR_DETALLES_PRODUCTOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});


//lISTAR CATEGORIAS

router.get('/listar_categoria', (req, res) => {
    let sql = "call SP_LISTAR_CATEGORIA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

//update productos
router.put('/upd_prod', (req, res) => {
    try {
        const { VCOD_PRODUCTO, VNOMBRE, VPRECIO, VCOD_CATEGORIA, VPROD_PER } = req.body;
        const consulta = `call SP_UPDATE_PRODUCTOS('${VCOD_PRODUCTO}','${VNOMBRE}','${VPRECIO}', ${VCOD_CATEGORIA},'${VPROD_PER}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Producto actualizado");
        });
    } catch (error) {
        res.send("0");
    }
});


//desactivar/activar productos
router.put('/del_productos', (req, res) => {

    try {

        const { VCOD_PROD, VIND } = req.body;
        const consulta = `call SP_DESACTIVAR_ACTIVAR_PRODUCTOS(${VCOD_PROD},'${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");
        });

    } catch (error) {


        res.send("0");
    }
});


/*-----------------------------------------------------------------------------------*/

router.get('/api/act_clientes', (req, res) => {


    let sql = "call SP_MOSTRAR_CLIENTES_ACTIVOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.post('/api/ins_clientes', (req, res) => {

    try {

        const { VNOMBRES, VAPELLIDOS, VDNI, VNUMTEL, VCORREO } = req.body;
        const consulta = `call SP_INSERT_CLIENTES('${VNOMBRES}' , '${VAPELLIDOS}'  ,'${VDNI}' ,'${VNUMTEL}','${VCORREO}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("CLIENTE INSERTADO...");
        });
    } catch (error) {

        res.send("0");

    }
}
);

router.get('/api/act_proveedores', (req, res) => {
    let sql = "call SP_MOSTRAR_PROVEEDORES_ACTIVOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});



router.get('/apireporte/sel_reporteinventario', (req, res) => {

    let sql = "call SP_MOSTRAR_REPORTES_ENTRADAS_SALIDAS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.get('/prod_vendidos', (req, res) => {

    let sql = "call SP_MOSTRAR_REPORTES_PRODUCTOSVENDIDOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_reporteventas', (req, res) => {


    let sql = "call SP_MOSTRAR_REPORTES_VENTAS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/ProdmasVendido', (req, res) => {


    let sql = "call SP_REPORTES_PRODUCTOS_MASVENDIDOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_reportecompras', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_COMPRAS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_prodmascomp', (req, res) => {
    let sql = "call SP_REPORTES_PRODUCTOS_MASCOMPRADOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_RepProg', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_PROGRAMADOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_RepHis', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_HISTORICOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/apireporte/sel_RepHis', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_HISTORICOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});

router.get('/listRoles', (req, res) => {
    let sql = "call SP_LISTAR_ROLES";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });


});


////Reporte Usuario
router.get('/apireporte/sel_reporteusuario', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_USUARIOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

///REPORTE USUARIOS DESACTIVADOS
router.get('/apireporte/sel_reporteusuariodesactivados', (req, res) => {
    let sql = "call SP_MOSTRAR_USUARIOS_DESACTIVADOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

//////Reporte de CLIENTES
router.get('/apireporte/sel_reportecliente', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTE_CLIENTES";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

////// REPORTE DE PROVEEDORES
router.get('/apireporte/sel_reporteprovee', (req, res) => {
    let sql = "call SP_MOSTRAR_REPORTES_PROVEEDORES";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});
/////// PRODUCTOS
router.get('/apireporte/sel_producto', (req, res) => {
    let sql = "call SP_MOSTRAR_DETALLES_PRODUCTOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/////////////////// EDITAR ROL
router.get('/apireporte/sel_EDITAROL', (req, res) => {
    let sql = "call SP_MOSTRAR_ROLES_PERMISOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiInv/catdropdown', (req, res) => {
    let sql = "call SP_LISTAR_CATEGORIA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.post('/api/insert_prod', (req, res) => {

    try {
        const { VNOMBRE, VPRECIO, VCOD_CATEGORIA, VPROD_PER } = req.body;
        const consulta = `call SP_INSERT_PRODUCTOS('${VNOMBRE}','${VPRECIO}', ${VCOD_CATEGORIA},'${VPROD_PER}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Producto agregado");
        });
    } catch (error) {
        res.send("0");
    }

});


router.get('/apicompras/contarprods', (req, res) => {
    let sql = "call SP_CONTAR_PRODS_BAJA_EXISTENCIA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.get('/apicompras/contarprodsperec', (req, res) => {
    let sql = "call SP_CONTAR_PRODS_PERECEDEROS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apicompras/listarbajaE', (req, res) => {
    let sql = "call SP_LISTAR_PROD_BAJA_EXISTENCIA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apicompras/listarprodsper', (req, res) => {
    let sql = "call SP_MOSTRAR_PRODUCTOS_PERECEDEROS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.put('/api/upd_categoria', (req, res) => {

    try {
        const { VCOD_CATEGORIA, VNOMBRE, VIND } = req.body;
        const consulta = `call SP_UPDATE_CATEGORIAS(${VCOD_CATEGORIA},'${VNOMBRE}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Categoria actualizada");
        });

    } catch (error) {


        res.send("0");
    }


});
router.get('/apiInv/carritoprods', (req, res) => {
    let sql = "call SP_LISTAR_PRODS_EN_CARRITO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});
//ingreso roles 
router.post('/inst_rol', (req, res) => {

    try {
        const { VNOMBREROL, VIND } = req.body;
        const consulta = `call SP_INSERTAR_NOMBRE_ROL('${VNOMBREROL}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("rol ingresado");
        });

    } catch (error) {


        res.send("0");
    }

});

//Insertar Proveedores
router.post('/api/ins_proveedores', (req, res) => {

    try {

        const { VNOMBRES, VAPELLIDOS, VDNI, VNUMTEL, VCORREO, VNOMBRE_EMPRESA } = req.body;
        const consulta = `call SP_INSERT_PROVEEDORES('${VNOMBRES}' , '${VAPELLIDOS}'  ,'${VDNI}' ,'${VNUMTEL}','${VCORREO}','${VNOMBRE_EMPRESA}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("PROVEEDOR INSERTADO...");
        });
    } catch (error) {

        res.send("0");

    }


});


router.put('/api/upd_proveedores', (req, res) => {


    try {

        const { VCOD_PROV, VNOMBRES, VAPELLIDOS, VDNI, VCORREO, VNUM_TEL, VNOMBRE_EMPRESA, VIND } = req.body;
        const consulta = `call SP_UPDATE_PROVEEDORES('${VCOD_PROV}','${VNOMBRES}' , '${VAPELLIDOS}'  ,'${VDNI}' ,'${VCORREO}','${VNUM_TEL}','${VNOMBRE_EMPRESA}','${VIND}' )`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("PROVEEDOR ACTUALIZADO...");
        });
    } catch (error) {

        res.send("0");

    }



});

router.put('/api/upd_clientes', (req, res) => {


    try {

        const { VCOD_CLIENTE, VNOMBRES, VAPELLIDOS, VDNI, VTEL, VCORREO, VPUNTOS_CLIENTE, VIND } = req.body;
        const consulta = `call SP_UPDATE_CLIENTES('${VCOD_CLIENTE}','${VNOMBRES}' , '${VAPELLIDOS}'  ,'${VDNI}' ,'${VTEL}','${VCORREO}','${VPUNTOS_CLIENTE}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("CLIENTE ACTUALIZADO...");
        });
    } catch (error) {

        res.send("0")
    };

});


router.put('/api/act_rol', (req, res) => {

    try {

        const { VCOD_ROL, VNOMBRE, VIND } = req.body;
        const consulta = `call SP_UPDATE_ROLES ('${VCOD_ROL}','${VNOMBRE}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");
        });

    } catch (error) {


        res.send("0");
    }



});


router.put('/api/upd_prod', (req, res) => {
    try {
        const { VCOD_PRODUCTO, VNOMBRE, VPRECIO, VCOD_CATEGORIA, VPROD_PER, VIND } = req.body;
        const consulta = `call SP_UPDATE_PRODUCTOS('${VCOD_PRODUCTO}','${VNOMBRE}','${VPRECIO}', ${VCOD_CATEGORIA},'${VPROD_PER}' ,'${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Producto actualizado");
        });
    } catch (error) {
        res.send("0");
    }

});

router.post('/api/INSVENTAS', (req, res) => {

    try {

        const { VNOMBRE, VCOD_VENTA, VTAMANIO, VPRECIO, VNOMBRE_CLIENTE, VUSER, VCANTIDAD, VTOTAL, VRECIBIDO, VCAMBIO,VMETODO_PAGO } = req.body;
        const consulta = `call SP_INGRESO_VENTA2 ('${VNOMBRE}','${VCOD_VENTA}','${VTAMANIO}','${VPRECIO}','${VNOMBRE_CLIENTE}','${VUSER}','${VCANTIDAD}','${VTOTAL}','${VRECIBIDO}','${VCAMBIO}','${VMETODO_PAGO}')`;
        console.log(consulta);
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");

        });


    } catch (error) {


        res.send("0");
    }



});





router.post('/api/INSVENTAprueba', (req, res) => {

    try {

        const { VNOMBRE, VSIZE, VCANTIDAD, VPRECIO } = req.body;
        const consulta = `call SP_INSERCIONDE_PRUEBA_VENTAS ('${VNOMBRE}','${VSIZE}','${VCANTIDAD}','${VPRECIO}')`;
        console.log(consulta);
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");

        });


    } catch (error) {


        res.send("0");
    }



});








router.get('/apiventas/listarpago', (req, res) => {
    let sql = "call SP_LISTAR_METODO_PAGO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiventas/listarclientes', (req, res) => {
    let sql = "call SP_LISTAR_NOMBRES_APELLIDOS_CLIENTES ";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});



router.get('/apiconf/countMetod', (req, res) => {
    let sql = "call SP_CONTAR_METODOS_PAGO_ACTIVO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiconf/countMetodinac', (req, res) => {
    let sql = "call  SP_CONTAR_METODOS_PAGO_INACTIVO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiconf/listarDetmetodosact', (req, res) => {
    let sql = "call SP_MOSTRAR_DETALLES_METODOPAGO_ACTIVOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiconf/listarDetmetodosinac', (req, res) => {
    let sql = "call SP_MOSTRAR_METODOPAGO_INACTIVO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});




router.put('/apiconf/updMetodo', (req, res) => {

    try {

        const { VCOD, VNOMBRE, VIND } = req.body;
        const consulta = `call SP_UPDATE_METODO_PAGOS ('${VCOD}','${VNOMBRE}','${VIND}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");
        });

    } catch (error) {


        res.send("0");
    }



});


router.get('/apiventas/lastCodventa', (req, res) => {
    let sql = "call SP_LISTAR_COD_ULTIMA_VENTA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

router.get('/apiventas/lastCodCompra', (req, res) => {
    let sql = "call SP_LISTAR_COD_ULTIMACOMPRA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});



router.get('/apireportes/listVentas2', (req, res) => {
    let sql = "call SP_LISTAR_REPORTE_VENTAS2";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.get('/apicompras/listarProvs', (req, res) => {
    let sql = "call SP_LISTAR_NOMBRE_APELLIDO_PROVEEDORES";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.post('/api/INScompras', (req, res) => {

    try {

        const {VCOD_COMPRA, VPROD, VSIZE, VCANTIDAD, VPRECIO, VTOTAL, VMETODPAGO, VRECIBIDO, VCAMBIO, VUSER,VNOMBRE_PROV } = req.body;
        const consulta = `call SP_INGRESO_COMPRA_2 ('${VCOD_COMPRA}','${VPROD}','${VSIZE}','${VCANTIDAD}','${VPRECIO}','${VTOTAL}','${VMETODPAGO}','${VRECIBIDO}','${VCAMBIO}','${VUSER}','${VNOMBRE_PROV}' )`;
        console.log(consulta);
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");

        });


    } catch (error) {


        res.send("0");
    }



});


router.get('/apicompras/comprasDet', (req, res) => {
    let sql = "call SP_MOSTRAR_COMPRAS_DETALLESCOMPRA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.put('/api/updProdsper', (req, res) => {

    try {

        const {VCOD, VNOMBRE, VSTOCK, VPRECIO, VFECHA_VEN, VCODCAT, VIND } = req.body;
        const consulta = `call SP_UPDATE_PRODS_PERECEDEROS ('${VCOD}','${VNOMBRE}','${VSTOCK}','${VPRECIO}','${VFECHA_VEN}','${VCODCAT}','${VIND}')`;
        console.log(consulta);
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");

        });


    } catch (error) {


        res.send("0");
    }



});


router.get('/apiconf/prodsincat', (req, res) => {
    let sql = "call SP_MOSTRAR_PRODUCTOS_INACTIVOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


router.put('/api/indProds', (req, res) => {

    try {

        const { VCOD, VIND } = req.body;
        const consulta = `call SP_UPDATE_IND_PRODUCTOS ('${VCOD}','${VIND}')`;
        console.log(VCOD);
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Estado actualizado");

        });


    } catch (error) {


        res.send("0");
    }



});

router.put('/api/upd_usuarios', (req, res) => {
    
    try {

        const { VCOD,VNOMBRE,VEMAIL } = req.body;
        const consulta = `call SP_UPDATE_USUARIOS_2('${VCOD}' ,'${VNOMBRE}','${VEMAIL}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("USUARIO ACTUALIZADO...");
        });
    } catch (error) {

        res.send("0");

    }

});

///INSERT REPORTE PROGRAMADO
router.post('/reporte_programado',(req, res) => {
       
    try {
        const { VTITULO, VTIPO, VFORMATO, VPERIODO_ENVIO, VCORREO } = req.body;
        const consulta = `call SP_INSERT_REP_PROGRAMADO('${VTITULO}','${VTIPO}','${VFORMATO}','${VPERIODO_ENVIO}','${VCORREO}')`;
        con.query(consulta, error => {
            if (error) throw error;
            res.send("Reporte programado insertado");
        });
    } catch (error) {
        res.send("0");
    }

});



/**
 * 
 * **********************APIS NUEVAS CREADAS PARA IMPRESION DE TICKETS ******************
 * 
 */

/*API PARA MOSTRAR EL ULTIMO ID DE VENTA EN FACTURA*/
 router.get('/ticket/id', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_IDVENTA";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR  EN FACTURA EL TOTAL DE LA ULTIMA VENTA */
router.get('/ticket/total', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_TOTAL_LEMPIRAS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR EN FACTRUA EL EFECTIVO RECIBIDO */
router.get('/ticket/recibido', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_RECIBIDO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR EN FACTRUA EL CAMBIO ENTREGADO */
router.get('/ticket/entregado', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_CAMBIO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR EN FACTRUA LA CAJERA REGISTRADA */
router.get('/ticket/cajera', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_NOMBRE_CAJERO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR EN FACTURA LOS PRODUCTOS VENDIDOS*/
router.get('/ticket/ultimaVenta', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_DATOS_PRODUCTOS";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});


/*API PARA MOSTRAR EN FACTRUA EL NOMBRE DEL CLIENTE */
router.get('/ticket/cliente', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_NOMBRE_CLIENTE";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA MOSTRAR EN FACTURA LA FORMA DE PAGO */
router.get('/ticket/formapago', (req, res) => {
    let sql = "call SP_IMPRIMIR_TICKET_FORMA_PAGO";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});

/*API PARA HABILITAR O DESAHIBILITAR EL CAMPO CAI EN LA FACTURA */
router.get('/parametros/paramrtn', (req, res) => {
    let sql = "call SP_FACTURA_MOSTRAR_PARAM_RTN";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

});




module.exports = router;