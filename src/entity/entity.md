# Entidade

Entidade é algo **único** - nesse caso vai posuir um id próprio

No DDD é responsável por carregar as regras de negócio do sistema

Deve sempre representar o estado correto e atual do elemento

Deve ser consistente a **todo momento**. Por exemplo, não se pode criar uma pessoa com o nome inicialmente vazio para depois setá-lo. Caso contrário não estamos cumprindo a regra de negócio, a não ser que ela permita que a pessoa não tenha seu nome definido.

## Entidade Anêmica
Uma entidade anêmica é aquela que apenas carrega dados, isto é, não carrega regra de negócio.

Bastante utilizada em POO quando criamos uma entidade com seus *getters* e *setters*.

## Regras de Negócio
