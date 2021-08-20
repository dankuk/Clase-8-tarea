import express from "express";
let productos = [];

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log("Server up en puerto", puerto)
);

server.on("error", (err) => {
  console.log("ERROR", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/productos/guardar", (req, res) => {
  const body = req.body;
  console.log(body.nombre);
  if (!body.nombre || !body.precio) {
    res.status = 400;
    return res.json({
      msg: "Falta el nombre o el precio",
    });
  }
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: body.nombre,
    precio: body.precio,
  };
  productos.push(nuevoProducto);
  res.status = 201;
  res.json({
    data: nuevoProducto,
  });
});

app.put("/productos/modificar/:id", (req, res) => {
  console.log(req.params);
  const idBuscado = Number(req.params.id);
  const body = req.body;

  const posicion = productos.map((aProduct) => aProduct.id).indexOf(idBuscado);
  console.log(posicion);
  if (posicion == -1) {
    res.status = 404;
    return res.json({
      msg: "Producto no encontrado",
    });
  }

  if (!body.nombre || !body.precio) {
    res.status = 400;
    return res.json({
      msg: "Falta el nombre o el precio",
    });
  }

  productos[posicion].nombre = body.nombre;
  productos[posicion].precio = body.precio;
  res.status = 201;
  res.json({
    data: productos[posicion],
  });
});

app.get("/productos/listar/:id", (req, res) => {
  console.log(req.params.id);
  const idBuscado = Number(req.params.id);

  const findProducto = productos.filter(
    (aProduct) => aProduct.id === idBuscado
  );
  console.log(findProducto.length);
  if (findProducto.length > 0) {
    res.json({
      data: findProducto,
    });
  } else {
    res.json({
      data: "Producto no encontrado",
    });
  }
});

app.get("/productos/listar", (req, res) => {
  if (productos.length > 0) {
    res.json({
      data: productos,
    });
  } else {
    res.json({
      error: "No hay productos cargados",
    });
  }
});
