FROM nginx:alpine

# Optionnel mais recommandé pour éviter le cache navigateur en dev:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier tous les fichiers statiques (HTML, CSS, JS, Images, SVG)
COPY *.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY *.png /usr/share/nginx/html/
COPY *.svg /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
