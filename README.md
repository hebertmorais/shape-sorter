# Descrição

O Shape Sorter auxilia o desenvolvedor que necessita criar uma infraestrutura de micro frontend, fornecendo, através de templates, o projeto inicial junto com um arquivo de configuração. Esse arquivo de configuração é onde todas as configurações referentes ao micro frontend serão adicionadas e manipuladas. A ferramenta de linha de comando permite que o desenvolvedor:

- Crie um projeto apto a integrar, no caso de um host, ou ser integrado, no caso de um módulo, em um micro frontend, junto com um projeto em React.js;
- Adicione ao host novos módulos remotos;
- Exponha componentes específicos de um módulo;
- Adicione novas dependências a serem compartilhadas.

Nessa versão da ferramenta proposta, o template criado é de um projeto em React.js. Essa escolha foi feita por ser uma ferramenta popular entre a comunidade, de fácil utilização, e no caso do Shape Sorter, permite que os componentes dos módulos sejam facilmente integrados ao host.

# Funcionalidades

Para avaliar a viabilidade da ferramenta, foi criado um projeto semelhante ao demonstrado por Michael Geers em [2]. A página do produto de uma loja de modelos de tratores vai servir como base para os exemplos a seguir.

![image](https://user-images.githubusercontent.com/8145430/118288195-8c868c00-b4aa-11eb-974b-3fd681edb899.png)
Imagem 2.1


# Inicialização


A instalação da ferramenta através do comando:

$ npm install -g shape-sorter

Esse comando permite instalar o Shape Sorter e utilizar o CLI em qualquer projeto de forma global.

Após instalar a ferramenta, é criada uma pasta do projeto, com as subpastas equivalentes a cada micro frontend do desenvolvedor. No caso do exemplo foi criada a pasta Models, referente ao projeto como todo,  e como pastas filhas os projetos relacionados aos times product, checkout e inspire, no qual são sugeridos no exemplo referente à imagem acima. 

![image](https://user-images.githubusercontent.com/8145430/118288544-ec7d3280-b4aa-11eb-9a9d-8c171ccb4efb.png)

Após isso é feita a criação dos templates em cada projeto.

# Comando de criação

A criação do projeto da página product, que é um host (página que engloba todas as outras), é feito através do comando:

$ shape-sorter create

Esse comando mostra algumas perguntas para a criação do projeto, que são:
Qual o nome do projeto?
Qual o tipo do micro frontend? (Host ou módulo)
Qual porta gostaria de executar o 
projeto?

![image](https://user-images.githubusercontent.com/8145430/118288632-fa32b800-b4aa-11eb-9f7a-f9495eb3c79d.png)


Quando o comando é efetivado e as perguntas respondidas, é criado um projeto em React.js com o arquivo .shapesorterrc.json contendo todas as variáveis para utilização dos micro frontends.

![image](https://user-images.githubusercontent.com/8145430/118288665-01f25c80-b4ab-11eb-9f00-9b4e42acf590.png)


Para iniciar o projeto e visualizar no browser, basta inserir os comandos:

$ npm install // ou yarn 
$ npm run start // ou yarn start

Após isso o projeto já estará sendo executado no browser, podendo ser acessado como endereço localhost e a porta inserida na criação.

Após a inserção dos arquivos, a fim que esteja como o exemplo, o projeto products se apresentará dessa forma:

![image](https://user-images.githubusercontent.com/8145430/118288703-09196a80-b4ab-11eb-977a-c9438cd59312.png)


Para a criação dos projetos checkout e inspire, que são módulos inseridos em products, segue-se o mesmo comando de criação citado anteriormente. Após a inserção do nome do módulo na pergunta feita na criação, ambos projetos serão selecionados como Module, e executados respectivamente nas portas 3001 e 3002, no caso do exemplo.

# Exposição de componentes de um módulo
O módulo checkout irá expor dois componentes: o Basket, que indica o número de itens no carrinho e CheckoutButton, que é o botão para finalizar a compra.

![image](https://user-images.githubusercontent.com/8145430/118288762-13d3ff80-b4ab-11eb-8e96-e8b296b3253d.png)

Acima os dois componentes relacionados ao projeto checkout, Basket e CheckoutButton

Para expor os componentes de Basket e CheckButton para a página de product, é inserido o seguinte comando:

$ shape-sorter expose

Esse comando irá perguntar ao desenvolvedor:
Com qual nome irá expor esse componente?
Qual o caminho que esse componente está localizado?

![image](https://user-images.githubusercontent.com/8145430/118288913-32d29180-b4ab-11eb-8802-c8a2f6a152d5.png)

O exemplo acima é relativo ao componente Basket. Após isso o mesmo é feito para o componente CheckoutButton. Ao fim ambos os componentes estarão aptos a serem utilizados pelo host products.

Assim como feito no projeto de checkout, o mesmo é feito no projeto inspire; o componente RelatedProducts é exposto, seguindo o mesmo comando de expor, citado anteriormente.

![image](https://user-images.githubusercontent.com/8145430/118289409-b3918d80-b4ab-11eb-8d18-cacf80e671b8.png)

Acima imagem do componente de RelatedProducts no projeto checkout

# Importação de um módulo
Para que todos os micro frontends sejam integrados no projeto final, os componentes expostos anteriormente são anexados como módulos remotos no host products através do seguinte comando:

$ shape-sorter remote

![image](https://user-images.githubusercontent.com/8145430/118289454-bd1af580-b4ab-11eb-8682-2984f0081d30.png)

Esse comando faz algumas perguntas como:
Qual o nome do módulo cujo componente está sendo exportado?
Com qual nome gostaria de usar o módulo (opcional)
Qual o nome do componente que está sendo importado?
Qual o endereço que o módulo está sendo executado?

Após esse comando o endereço do componente anexado é integrado à lista de módulos remotos do host, possibilitando utilizá-lo em tempo de execução. Esse comando também cria um arquivo referente ao componente importado, possibilitando sua utilização de forma assíncrona.

![image](https://user-images.githubusercontent.com/8145430/118289475-c4da9a00-b4ab-11eb-8192-5dd17f0fafdc.png)


Assim como o componente Basket, do projeto de checkout, foi importado, o mesmo é feito com o CheckoutButton, também do projeto checkout, e além disso é importado o componente RelatedProducts do projeto inspire.

Como os arquivos criados na pasta de remotes já permitem sua utilização, os componentes são adicionados à página do host de produtos, fazendo que a página final se assemelhe àquela demonstrada inicialmente, simbolizada na primeira imagem.

![image](https://user-images.githubusercontent.com/8145430/118289532-d459e300-b4ab-11eb-99ec-bf51af9fd2b4.png)


# Inserção de dependências

A fim de demonstrar o compartilhamento de dependências entre micro frontends foi adicionado uma biblioteca, em projects e em checkout, chamada date-fns para auxiliar na manipulação de datas. Em projects, no final da página ao lado esquerdo, ele diz qual dia da semana é hoje, e em checkout, indicada no componente de Basket, a data de três dias atrás formatada.

![image](https://user-images.githubusercontent.com/8145430/118289583-e176d200-b4ab-11eb-880a-e36bb8b74c37.png)


Para compartilhar a biblioteca entre projetos, com o propósito de que não haja redundância de código ou divergência entre verões, o desenvolvedor pode inserir quais dependências gostaria de compartilhar entre os projetos com o seguinte comando:

$ shape-sorter dependency

![image](https://user-images.githubusercontent.com/8145430/118289610-e9cf0d00-b4ab-11eb-96fa-bf1e38f9a196.png)


O comando lista todas as dependências que ainda não foram compartilhadas e o desenvolvedor é apto a escolher aquelas que deseja compartilhar.


O comando exibe uma lista de dependências, e o desenvolvedor pode selecionar as que deseja adicionar. Após a seleção as seguintes perguntas são feitas, a cada dependência selecionada:
A dependência é um singleton? (uma versão única)
A dependência é eager? (é carregada no início do projeto)
