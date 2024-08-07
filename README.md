
   # Projeto Eixo 3 - Zabbix Store
   `Curso: Sistemas de Informação`
   
   `Disciplina: Design Centrado no Usuário`

   `Semestre: 3º período`


   ## Integrantes:
   - Gabriel Amorim Santos
   - Lucas Morais Barcelos
   - Pedro Henrique Nunes Alves
   - Victor Hugo Vasquez da Silva

###  Documentação da aplicação
https://docs.google.com/presentation/d/1iNdfCZIsZcAQg2_F78KtXzX5WdicLcTvWbHqgmCJ79k/edit?usp=sharing



   ## Instruções para iniciar aplicação em container

1. Vá para a raiz da aplicação e rode:
   ~~~
   docker-compose up -d
   ~~~

- A aplicação web ficará disponível na porta 5000 por padrão 
   ~~~
   http://localhost:5000
   ~~~

- A aplicação backend ficará disponível na porta 3000 por padrão
- O postgree ficará disponível na porta 9080 da máquina local, no container porta 5432 (padrão)

## Instruções para iniciar separadamente o BackEnd

1. Na pasta <i>backend</i>, dê esse comando:
   ~~~
   npm install
   ~~~
   ~~~
   npx prisma init
   ~~~
   ~~~
   npx prisma generate && npx prisma db push
   ~~~
2. Após ter terminado, para iniciar a aplicação:
   ~~~
   npm run start:dev
   ~~~

- Swagger estará disponível em:
   ~~~
   http://localhost:3000/api
   ~~~
   
- Caso queira rodar o prisma studio, rode:
   ~~~
   npx prisma studio
   ~~~


   ## Instruções para iniciar separadamente o Frontend

1. Na pasta <i>frontend</i>, dê esse comando:
   ~~~
   npm install
   ~~~
2. Após ter terminado, para iniciar a aplicação:
   ~~~
   npm run dev
   ~~~

