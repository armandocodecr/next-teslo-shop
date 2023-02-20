# Next.js Teslo shop
Para correr localmente se necesita la base de datos

- docker-compose up -d

* El -d, significa _datached_

* MongoDB URL Local:

- mongodb://localhost:17017/teslodb

# Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

## Llenar la base de datos con informacion de pruebas

Llamar: ''http://localhost:3000/api/seedtp''

# Notas
Este proyecto está subido a un dominio, en mi caso de Vercel. No tengo la posibilidad
de pagar un dominio para que soporte Serverless functions, por lo que habrán ciertas
características que en producción (no local) no estarán disponibles, dará un error 504.
Pero si clonan el respositorio y hacen el "build" de la aplicación de manera local, no
tendrán problemas y podrán hacer uso de todas las carácterísticas (por ejemplo, buscar un producto). 
Esto lo aclaro ya que no es un problema de desarrollo si no del timeout que tienen los
dominiox ante las serverless functions, y actualmente no tengo la posibilidad de pagar
un dominio para ya poder hacer uso de ellas en la nube.

El dominio es el siguiente: https://next-teslo-shop-2023.vercel.app/

## Un saludo.
