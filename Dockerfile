# Usar la imagen base de Node.js para construir el proyecto
FROM node:18 AS build

WORKDIR /app

# Copiar archivos necesarios para la instalación
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de la build al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el CSV a un directorio accesible
COPY public/data/Titanic-Dataset.csv /data/Titanic-Dataset.csv

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
