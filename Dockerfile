FROM node:20-slim

WORKDIR /app

# Copia o restante dos arquivos depois
COPY . .

RUN apt-get update && apt-get install -y dos2unix \
    && dos2unix setup.js \
    && chmod +x setup.js

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Declarar o Node como interpretador
ENTRYPOINT ["./setup.js"]
