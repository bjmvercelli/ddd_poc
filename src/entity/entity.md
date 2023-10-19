# Entidade

Entidade é algo **único** - nesse caso vai posuir um id próprio

No DDD é responsável por carregar as regras de negócio do sistema

Deve sempre representar o estado correto e atual do elemento

Deve ser consistente a **todo momento**. Por exemplo, não se pode criar uma pessoa com o nome inicialmente vazio para depois setá-lo. Caso contrário não estamos cumprindo a regra de negócio, a não ser que ela permita que a pessoa não tenha seu nome definido.

Deve se autovalidar.

> Essa é uma entidade focada em negócios. Não é uma entidade de banco de dados. Ou seja, seria necessário criar uma outra entidade para representar no banco de dados, podemos pensar nela como model ou modelo de persistência.

Complexidade de Negócio x Complexidade Acidental

## Entidade Anêmica
Uma entidade anêmica é aquela que apenas carrega dados, isto é, não carrega regra de negócio.

Bastante utilizada em POO quando criamos uma entidade com seus *getters* e *setters*.
