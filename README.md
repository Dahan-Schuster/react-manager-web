# Projeto Padrão

Um ponto inicial para sistemas WEB feito com ReactJS, e MUI. Inclui rotas CRUD para usuários, perfis, temas e permissões; menu lateral; login e mais.

## Conteúdo

- [Projeto Padrão](#projeto-padrão)
  - [Conteúdo](#conteúdo)
  - [Instalação](#instalação)
    - [Preparação do ambiente](#preparação-do-ambiente)
  - [Desenvolvimento](#desenvolvimento)
    - [Novas páginas](#novas-páginas)
      - [MainLayout](#mainlayout)

## Instalação

Para usar o template, clone o projeto e remova a remote primária:

```bash
  # aqui você pode passar o nome da pasta que desejar, para atender sua necessidade
  git clone git@bitbucket.org:manservquaestum/front-padrao.git
  cd api-projeto
  git remote remove origin
```

Isso irá clonar o projeto na branch principal, e depois remover a remote origin para poder adicionar a URL do seu repositório.

**ATENÇÃO:** Dê preferência a criar o repositório sem commits automáticos (como arquivos .gitignore ou READMEs) que são criados junto do repositório. Isso irá descomplicar o passo de fazer push dos commits do projeto padrão no

Depois adicione a URL do seu repositório como origin:

```bash
  git remote add origin <URL_REPOSITORIO_API_SEU_PROJETO>
  git push origin main
```

Opcionalmente, você pode adicionar o repositório do Projeto Padrão como uma remote secundária, para poder atualizar seu projeto quando houverem novas funcionalidades no Padrão:

```bash
  # isso irá adicionar a remote de nome "padrao":
  git remote add padrao git@bitbucket.org:manservquaestum/front-padrao.git

  # para usá-la, basta usar "padrao" ao invés de "origin" ao fazer pull:
  git pull padrao main

```

Remotes são URLs para repositórios de onde se pode fazer `pull` ou `push` do código local. A remote "origin" é a primária e deve apontar para seu projeto.

    Cuidado! A depender do quão diferente estiver o seu projeto do Projeto Padrão, fazer
    um pull da remote "padrao" pode gerar conflitos. É recomendável mover para uma nova
    branch antes de fazer o pull, e NÃO usar a opção --rebase

### Preparação do ambiente

Como parte da instalação, é necessário preparar o ambiente de desenvolvimento seguindo estes passos:

1. Configurar arquivo src/config.ts de acordo com o src/config.example.ts, definindo os dados básicos do projeto, como nome, URL da API, chaves do localStorage e mais

2. Instalar as dependências usando yarn
   - Usamos Yarn como padrão para gerencias dependências no projeto. Usar NPM em conjunto pode gerar em inconsistências.

```bash
    # execute o commando abaixo se o yarn não estiver instalado
    npm install -g yarn

    # mudar para a pasta do projeto
    cd front-projeto

    # instalar dependências listadas no package.json
    yarn
```

## Desenvolvimento

Para começar a desenvolver o sistema, certifique-se de ter passado pelos passos da [instalação](#instalação) e prossiga para iniciar um servidor de desenvolvimento no terminal:

```bash
# navega para a pasta do projeto
cd front-projeto

# inicie o sistema em modo de dev
yarn dev
```

### Novas páginas

O projeto utiliza a lib [react-router-dom v6](https://reactrouter.com/en/6.23.1) para gerenciar as rotas do app. Verifique a documentação para retirar dúvidas.

Para criar uma nova página, primeiro crie um arquivo na pasta `./src/pages`. É recomendável que separe os módulos sempre por pastas, agrupando diferentes arquivos relacionados ao mesmo módulo. Crie um arquivo inicial usando o componente MainLayout, que contém o cabeçalho e o menu lateral:

```tsx
// ./src/pages/Home/index.tsx

import { FC } from "react";
import MainLayout from "../containers/Common/MainLayout";

interface InitialPageProps {
  // defina aqui as propridades esperadas pelo compnente
  // geralmente Páginas não recebem props
}

/**
 * Página inicial da aplicação
 */
const InitialPage: FC<InitialPageProps> = () => {
  return <MainLayout title="Home">Página inicial</MainLayout>;
};

export default InitialPage;
```

Depois adicione a rota ao arquivo `./src/routes/appRoutes.tsx` como filha da rota inicial.

Usamos carregamento assíncrono para reduzir o tamanho do build final, usando o conceito de [code splitting](https://create-react-app.dev/docs/code-splitting/), que divide a aplicação em pedaços que são carregados conforme necessário. Para isso, importamos o componente da página dentro do método `lazy` do objeto da rota:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      // ...

      // nova rota adicionada à aplicação
      {
        path: "/home", // caminho relativo à rota pai
        async lazy() {
          // importação assíncrona do componente da página
          let { default: Index } = await import("../pages/Home");
          return { Component: Index };
        },
      },
    ],
  },
]);
```

Para saber mais sobre como definir rotas, leia a documentação do método [createBrowserRouter](https://reactrouter.com/en/main/routers/create-browser-router) e da opção [lazy](https://reactrouter.com/en/main/route/lazy).

A rota `/` definida como pai de todas as outras define um container global chamado `RootPage` e uma página de erro padrão chamada `ErrorPage`.

- RootPage

  Define os contextos da aplicação e outras configurações globais. Note que esse elemento é carregado sem usar a opção `lazy`, ou seja, será carregado sempre que a aplicação for iniciada. Contextos e outras configurações carregadas aqui estarão disponíveis para todas as rotas filhas.

- ErrorPage

  Página renderizada sempre que algum erro fatal for lançado na aplicação. Desde rota não encontrada até erros de compilação. Você pode personalizá-la como preferir.

#### MainLayout

O componente `MainLayout` serve para encapsular as páginas da aplicação e manter o mesmo layout em todas. Ele recebe algumas props que podem ser usadas para personalizar e configurar a página. Verifique o componente para conhecer as props.
