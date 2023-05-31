# Etapa 1: Construir la aplicación Angular
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g @angular/cli   # Instalar Angular CLI de forma global
RUN npm install
COPY . /app/
RUN ng build

# Etapa 2: Configurar el servidor web
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
