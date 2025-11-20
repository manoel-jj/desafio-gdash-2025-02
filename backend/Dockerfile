# Escolhe a imagem base (Node.js oficial)
FROM node:22-alpine

# Define o diretório dentro do container onde o código vai ficar
WORKDIR /app

# Copia o package.json para dentro do container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta onde o app vai rodar
EXPOSE 3000

# Comando para iniciar o backend
CMD ["npm", "start"]
