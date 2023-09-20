


## Manejo de controller 

### Reglas
#### --Mantener siempre el valor status
===== 
 
#### Tipo de retorno para la lista total de datos con paginacion
``Cualquier duda seguir ejemplo de user.controller.ts``

Para el manejo de paginacion se obtiene la ultima key(id) de los datos que se obtienen
``"lastKey": 8,``
Mediante el ultimo valor de los datos se obtiene la siguiente key(id)
``"next_key": 7,``
El dato para obtener la anterior pagina es necesario el ultimo key que se envio lo cual se saca del key enviado
``"prev_key": 0,``
Se sabe que es ultimo key porque ya sacamos la key final, lo cual hacemos la comparacion a ver si es ultima page
``"lastPage": lastKey == next_key,``
```
return res.status(200).json({
        "status": "ok",
        "data": [],
        "meta": {
            "lastPage": true,
            "prev_key": 0,
            "next_key": 8,
            "lastKey": 8,
            "order": "asc"
        }
    });
```

#### Tipo de retorno para Update 
```
return res.status(200).json({
    status: "ok"
    });
```

#### Tipo de retorno para Create
Retornar un DTO si es necesario
```
return res.status(201).json({
        status: "ok",
        data: DTO,
    })
```

#### Tipo de retorno para los errores
```
return res.status(400).json({
        status: "error",
        error: "Ocurrio un error inesperado"
    });
```