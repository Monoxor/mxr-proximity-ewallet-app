FROM ubuntu
RUN apt-get update && apt-get upgrade -y
RUN apt-get install nginx -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
COPY ./ /app
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
RUN npm -v
RUN npm install
RUN npm run build
RUN mkdir /var/www/html/ewallet
RUN cp -r ./build/* /var/www/html/ewallet
CMD ["nginx","-g","daemon off;"]