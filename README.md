## About this project

- [x]  Desenvolver página Login
    - [x]  Permitir autentificar usuário.
        - [x]  Campos:
            - [x]  Id
            - [x]  UserName
            - [x]  Password
        - [x]  Ao entrar com username e password deve ser gerada uma token JWT
        - [x]  As próximas requisições devem ser autentificadas.
        - [x]  Ao autentificar deve ser redirecionado para a pagina lista de tarefas.
    - [x]  Permitir cadastrar usuário.
        - [x]  Deve ser informado os campos de um usuário
            - [x]  UserName
            - [x]  Password
                - [x]  Senha precisa está criptografada no banco.
            - [x]  Confirmação de Senha
- [x]  Desenvolver página Lista de tarefas.
    - [x]  Campos:
        - [x]  Title
        - [x]  Description
        - [x]  IsConcluded
        - [x]  UpdatedAt
    - [x]  Permitir criar uma nova tarefa.
        - [x]  Abrir modal
        - [x]  Campos para cadastro:
            - [x]  Title
            - [x]  Description
    - [x]  Permitir marca tarefa como concluída
        - [x]  Na própria tabela, adicionar essa opção.
        - [x]  Vou colocar um botão onde o usuário pode concluir e remover a marcação a hora que precisar.
            - [x]  Adicionar cores relativas como verde.
    - [x]  Permitir atualizar uma tarefa
        - [x]  Ao atualizar devo informar a última atualização feita na tarefa.
            - [x]  Informar um data informando a atualização.
    - [x]  Permitir remover uma tarefa.
    - [x]  Desenvolver paginação.
        - [x]  Página pelo fronend?
            - [x]  Escolhida paginação pelo frontend
            - [x]  Entrego mais rápido
        - [x]  Página pelo backend?
            - [x]  Me destaco melhor.

### Observations

- [ ]  Verificar sobre testes automatizados por parte do backend
- [ ]  Verificar dockerizar o monolito para facilitar uso
- [x]  SQLServer ao invés de PostgreSQL
- [x]  Tempo estimado de 1 dia para desenvolvimento
    - [x]  Prazo até sexta-feira.