# Instrucciones para NODEPOP

## Crear el .env

Copiar el contenido de .env.example a .env

```
cp .env.example .env
```

## INICIAR EL PROYECTO

En primera instancia, debemos inicializar la base de datoos. Contiene algunos productos cargados y eliminará los creados en la ultima sesion. El comando para inicializarla es:

```
node initDB.js
```

La aplicacion tiene instalados los modulos necesarios para su correcto funcionamiento presentes en el package.json

## Para iniciar Nodepop, una vez tengamos la BBDD lista, debemos ejecutar el comando:

```
npm run dev
```

## Para iniciar en producción:

```
npm start
```

## Uso de la web

Para comenzar, Nodepop cuenta con una pagina principal (llamada index) que sirve como bienvenida al usuario.

```
http://localhost:3000
```

Nodepop cuenta con un API en la que podremos ver un archivo json con todos los productos subidos a la plataforma y crear productos nuevos. Para ello es necesario identificarse con las credenciales:<br>

```
user: user@example.com
password: 1234
```

```
user: admin@test.com
password: 1234
```

Tambien podemos hacer login en la app con esos mismos usuarios y de esta manera ver la seccion de privado, solo disponible para usuarios logeados.

## URL del API:

```
http://localhost:3000/api/productos
```

Además se podran añadir nuevos productos mediante el comando post. Para ello, es necesario autenticarse con:

Por ultimo, cuenta con una pagina frontend en la que podremos ver todos los productos.

## URL PAGINA FRONTEND CON LISTADO PRODUCTOS

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
