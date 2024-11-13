FROM nginx:alpine
COPY front-todolist/src /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80