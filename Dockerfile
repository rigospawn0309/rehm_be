FROM node:19-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

# he puesto el usuario despues por temas de permisos
USER node

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
