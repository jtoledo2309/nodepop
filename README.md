Instrucciones para NODEPOP

INICIAR EL PROYECTO

En primera instancia, debemos inicializar la base de datoos. Contiene algunos productos cargados y eliminará los creados en la ultima sesion. El comando para inicializarla es:

```
node initDB.js
```

La aplicacion tiene instalados los modulos necesarios para su correcto funcionamiento presentes en el package.json

para iniciar Nodepop, una vez tengamos la BBDD lista, debemos ejecutar el comando:

```
npm run dev
```

Nodepop cuenta con un API en la que podremos ver un archivo json con todos los productos subidos a la plataforma.

URL del API:

```
http://localhost:3000/api/productos
```

Además se podran añadir nuevos productos mediante el comando post. Para ello, es necesario autenticarse con:
user: admin
password: 1234

Por ultimo, cuenta con una pagina frontend en la que podremos ver todos los productos.

```
http://localhost:3000/products
```

Tambien permite filtrar por el nombre(name) del producto, precio(precio), etiquetas(tag) o estado del producto(forSale) tanto en la pagina forntend como en el API.

Por ultimo, podremos visualizar los tags existentes en la plataforma en:

```
http://localhost:3000/products/etiquetas
```

Y en el API:

```
http://localhost:3000/api/productos/etiquetas
```
