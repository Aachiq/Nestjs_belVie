# FROM node:21-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# #RUN npm run build  // we comment that if we want hot reload
# RUN npm run build 

# EXPOSE 5000

# # CMD ["npm", "run", "start:dev"] // we use that if we want hot reload
# CMD ["node", "dist/main.js"]
