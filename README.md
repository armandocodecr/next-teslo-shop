# Next.js Teslo shop
Para correr localmente se necesita la base de datos

- docker-compose up -d

* El -d, significa _datached_

* MongoDB URL Local:

- mongodb://localhost:17017/teslodb

#Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

##Llenar la base de datos con informacion de pruebas

Llamar: ''http://localhost:3000/api/seedtp''