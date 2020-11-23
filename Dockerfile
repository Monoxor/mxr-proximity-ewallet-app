FROM node
EXPOSE 2080
ENV PORT=2080
COPY ./ /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "run", "start"]