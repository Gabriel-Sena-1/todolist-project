FROM mcr.microsoft.com/dotnet/sdk:8.0.403 AS build
WORKDIR /app

# Copiar apenas o arquivo .csproj primeiro
COPY Todolist/*.csproj ./
RUN dotnet restore

# Depois copiar o resto dos arquivos
COPY Todolist/. ./
RUN dotnet publish -c Release -o out

# Build da imagem runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

# Criar diretório para o banco de dados e definir permissões
RUN mkdir -p /app/Data && \
    chown -R $APP_UID:$APP_UID /app/Data

EXPOSE 5000
ENTRYPOINT ["dotnet", "Todolist.dll"]