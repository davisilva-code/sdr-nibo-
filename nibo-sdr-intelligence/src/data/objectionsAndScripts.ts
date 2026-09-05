import { Objection, Script } from '../types';

export const OBJECTIONS_LIBRARY: Objection[] = [
  {
    id: 'obj-preco',
    category: 'Preço',
    objectionText: 'Achei caro / Não tenho orçamento no momento',
    prospectMindset: 'O contador está enxergando o sistema como um CUSTO e não calculou quantas horas operacionais da equipe (ou do próprio sócio) ele ganha.',
    sdrPitfallToAvoid: 'Dar desconto imediato ou começar a listar funcionalidades de forma apressada.',
    strategy: 'Ancorar o valor em relação ao custo por hora de trabalho manual ganho e ao custo de contratar mais um assistente contábil.',
    sampleResponse: 'Entendo perfeitamente, [Nome]. Quando olhamos só pelo valor de uma mensalidade sem ver a economia na ponta, parece um investimento adicional. Mas deixa eu te perguntar: quanto custa hoje o salário de uma pessoa no fiscal/contábil pra ficar cobrando extrato ou conferindo guias?',
    followUpQuestion: 'Se a gente conseguir economizar 20 horas no mês de cada funcionário, o sistema se paga sozinho ou ainda fica pesado para você?',
    nextStep: 'Agendar 15 minutos para fazer uma simulação de ROI baseada no número de clientes do escritório.',
    productRelated: 'Todos'
  },
  {
    id: 'obj-tempo',
    category: 'Tempo',
    objectionText: 'Estou sem tempo agora / Me manda no WhatsApp',
    prospectMindset: 'O contador está apagando incêndio operacional e acha que a ligação é um telefonema vendedor genérico que vai tomar tempo.',
    sdrPitfallToAvoid: 'Aceitar enviar material genérico no WhatsApp sem agendar compromisso ou qualificar a dor.',
    strategy: 'Validar a falta de tempo e usar exatamente essa dor como gancho principal da ferramenta.',
    sampleResponse: 'Eu imagino a correria, [Nome], e por saber que o senhor fica atolado na operação é que estou te ligando. Não quero te mandar um PDF genérico que vai ficar perdido nas suas mensagens. Me dá 30 segundos: o que consome mais seu tempo hoje, cobrança de extrato ou gestão de guias?',
    followUpQuestion: 'Se eu te mandar um vídeo de 2 minutos mostrando como resolver isso em 1 clique, você consegue ver hoje no fim do dia?',
    nextStep: 'Definir horário exato para o envio do vídeo + horário do follow-up.',
    productRelated: 'Conciliador Open Finance / Obrigações Plus'
  },
  {
    id: 'obj-sistema-atual',
    category: 'Sistema Atual',
    objectionText: 'Já uso um sistema contábil (Domínio, Alterdata, Questor, etc.)',
    prospectMindset: 'Ele acha que o Nibo é um ERP contábil concorrente e que teria que trocar o sistema fiscal/folha que já usa há anos.',
    sdrPitfallToAvoid: 'Falar mal do sistema contábil atual dele ou sugerir uma troca dolorosa de ERP.',
    strategy: 'Esclarecer que o Nibo é um ecossistema complementar de automação e comunicação que RODA JUNTO com o sistema contábil atual.',
    sampleResponse: 'Que ótimo! O [Sistema Atual] é excelente para o cálculo de folha e apuração de impostos. O Nibo não substitui o seu sistema fiscal. Ele funciona como uma camada de automação na frente dele, buscando extratos e controlando entregas que o [Sistema Atual] não faz.',
    followUpQuestion: 'Vocês hoje usam o [Sistema Atual] para cobrar extrato bancário do cliente no WhatsApp ou ainda fazem isso na raça?',
    nextStep: 'Demonstrar a integração do Nibo com o sistema atual do escritório.',
    productRelated: 'Conciliador Open Finance / Obrigações Plus'
  },
  {
    id: 'obj-concorrente',
    category: 'Concorrente',
    objectionText: 'Já uso um concorrente (Acessórias, Gestta, Tareffa, etc.)',
    prospectMindset: 'Ele está acostumado com a solução atual e tem preguiça de qualquer mudança de ferramenta.',
    sdrPitfallToAvoid: 'Dizer que o concorrente é ruim. Isso gera postura defensiva no cliente.',
    strategy: 'Reconhecer a ferramenta e investigar onde o concorrente deixa lacunas (ex: Open Finance com +25 bancos, Radar e-CAC nativo).',
    sampleResponse: 'A [Concorrente] é uma boa ferramenta de tarefas. O que nossos clientes que vieram de lá mais elogiam no Nibo é a nossa tecnologia de Open Finance direto com 25 bancos e a varredura automática do e-CAC sem precisar logar manualmente.',
    followUpQuestion: 'Como está a taxa de sucesso de vocês na busca automática de extratos na ferramenta atual?',
    nextStep: 'Comparativo objetivo de recursos exclusivos do ecossistema Nibo.',
    productRelated: 'Conciliador Open Finance / Radar e-CAC'
  },
  {
    id: 'obj-sem-interesse',
    category: 'Falta de Interesse',
    objectionText: 'Não tenho interesse / Meus processos estão ótimos',
    prospectMindset: 'O prospect nem parou para entender o motivo do contato e quer encerrar a chamada o mais rápido possível.',
    sdrPitfallToAvoid: 'Pedir desculpas e desligar a ligação imediatamente.',
    strategy: 'Fazer uma pergunta provocativa de cenário que expõe a dor oculta sem parecer confrontador.',
    sampleResponse: 'Perfeito, [Nome]. Se os seus processos estão 100% afinados, parabéns de verdade. Só por curiosidade de mercado: a sua equipe consegue fechar os balancetes do mês sem precisar cobrar o cliente nenhuma vez por extrato atrasado?',
    followUpQuestion: 'Se eu te mostrasse que existe uma forma de automatizar isso 100%, você estaria aberto a conhecer em 10 minutos?',
    nextStep: 'Gancho de curiosidade para converter em reunião rápida de demonstração.',
    productRelated: 'Conciliador Open Finance'
  },
  {
    id: 'obj-socio-decide',
    category: 'Decisão',
    objectionText: 'Não sou eu quem decide / Preciso falar com meu sócio',
    prospectMindset: 'O contato pode ser um gerente operacional ou um sócio que não quer assumir o risco de avaliar sozinho.',
    sdrPitfallToAvoid: 'Pedir para ele transmitir o recado para o sócio sozinho.',
    strategy: 'Transformar esse contato em um aliado e propor um alinhamento rápido com o sócio junto.',
    sampleResponse: 'Faz todo sentido, [Nome]. Decisões estratégicas de processos têm que passar por todos os sócios. Para eu não te tomar tempo tentando explicar o sistema para ele, que tal agendarmos 15 minutos nós três juntos nesta quinta-feira?',
    followUpQuestion: 'O que você acha que seria o ponto mais importante para o seu sócio nessa avaliação?',
    nextStep: 'Agendar reunião conjunta com ambos os sócios.',
    productRelated: 'Todos'
  }
];

export const SCRIPTS_LIBRARY: Script[] = [
  {
    id: 'script-cold-call-open-finance',
    title: 'Cold Call — Conciliador Open Finance',
    category: 'Cold Call',
    targetProduct: 'Conciliador Open Finance',
    objective: 'Despertar dor sobre cobrança de extratos e agendar reunião de 15 minutos com o especialista.',
    openingLine: 'Olá, [Nome do Contador], tudo bem? Aqui é o [Seu Nome] do Nibo. Peguei o seu contato porque vi que vocês atendem empresas em [Cidade] e sei que fechamento de mês é uma correria. Posso te fazer uma pergunta rápida de 30 segundos sobre como vocês recebem os extratos bancários hoje?',
    discoveryQuestions: [
      'Hoje quantos clientes do escritório costumam atrasar o envio do extrato no fim do mês?',
      'Como a sua equipe lida quando o cliente manda extrato em PDF borrado ou incompleto?',
      'Se os dados bancários chegassem conciliados direto no sistema todo dia sem depender do cliente, o que mudaria na sua rotina?'
    ],
    painExploration: 'A maioria dos contadores nos conta que a equipe gasta mais de 30% do mês apenas ligando e mandando mensagem pra cobrar extrato. Isso trava o setor contábil inteiro.',
    transition: 'É exatamente para acabar com isso que desenvolvemos o Conciliador Open Finance do Nibo.',
    pitch: 'Nós conectamos diretamente com mais de 25 bancos do seu cliente. A informação bancária vem limpa e automática para a conciliação, sem você ter que pedir nada ao cliente.',
    cta: 'Você tem 15 minutos nesta quinta às 10h ou sexta às 14h para eu te mostrar como isso funciona na prática com a sua carteira?',
    commonObjections: ['Achei caro', 'Me manda no WhatsApp', 'Já uso sistema contábil']
  },
  {
    id: 'script-whatsapp-obrigacoes',
    title: 'Abordagem WhatsApp — Nibo Obrigações Plus',
    category: 'WhatsApp',
    targetProduct: 'Nibo Obrigações Plus',
    objective: 'Iniciar conversa no WhatsApp e gerar resposta com pergunta aberta sobre controle de guias.',
    openingLine: 'Olá, [Nome do Contador]! Tudo bem por aí? Acompanho o trabalho da [Nome do Escritório] em [Cidade]. Estou entrando em contato porque ajudamos escritórios contábeis a eliminarem 100% do risco de multas no envio de guias e impostos.',
    discoveryQuestions: [
      'Vocês hoje usam planilha ou sistema próprio para controlar os prazos das obrigações?',
      'Já tiveram dores de cabeça com cliente dizendo que não recebeu a guia no e-mail?'
    ],
    painExploration: 'Enviar guia por e-mail tem taxa de abertura muito baixa. O cliente esquece, o imposto vence e a responsabilidade acaba caindo no escritório.',
    transition: 'O Nibo Obrigações Plus centraliza o controle de prazos e entrega as guias via WhatsApp/App com protocolo automático.',
    pitch: 'Sua equipe sabe exatamente o que foi entregue, o que falta vencer e o cliente recebe a guia na tela do celular onde ele realmente abre.',
    cta: 'Posso te mandar um áudio rápido de 1 minuto explicando como funciona para o perfil do seu escritório?',
    commonObjections: ['Meus clientes não vão usar', 'Já tenho sistema de tarefas']
  },
  {
    id: 'script-cold-call-ecac',
    title: 'Cold Call — Radar e-CAC',
    category: 'Cold Call',
    targetProduct: 'Radar e-CAC',
    objective: 'Explorar o trabalho manual de acesso ao e-CAC e vender a varredura automática.',
    openingLine: 'Olá [Nome], aqui é o [Seu Nome] do Nibo. Estou falando com a pessoa responsável pela gestão fiscal do escritório?',
    discoveryQuestions: [
      'Quantas horas por semana sua equipe gasta logando no e-CAC cliente por cliente com certificado digital?',
      'Como vocês descobrem hoje se surgiu alguma pendência ou mensagem da Receita Federal para um cliente?'
    ],
    painExploration: 'Geralmente os contadores só descobrem pendência no e-CAC quando a CND do cliente é emitida com impedimento ou quando o cliente cobra urgência.',
    transition: 'O Radar e-CAC resolve isso fazendo varredura diária automática.',
    pitch: 'Ele monitora as caixas postais e certidões de todos os seus CNPJs diariamente e te avisa no painel assim que surge qualquer divergência.',
    cta: 'Vale a pena alinharmos 10 minutos nesta semana para te mostrar o Radar e-CAC rodando?',
    commonObjections: ['Só consultamos quando o cliente pede', 'Não tenho orçamento']
  }
];

export const SALES_SCRIPTS = SCRIPTS_LIBRARY;
