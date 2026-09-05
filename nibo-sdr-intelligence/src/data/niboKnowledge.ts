import { NiboProduct, PainMatrixItem } from '../types';

export const NIBO_PRODUCTS: NiboProduct[] = [
  {
    id: 'conciliador-open-finance',
    name: 'Conciliador Open Finance',
    category: 'Financeiro',
    shortDescription: 'Busca automática de dados bancários diretamente das instituições financeiras sem solicitar extratos PDF.',
    fullDescription: 'O Conciliador Open Finance Nibo conecta o escritório de contabilidade diretamente a mais de 25 instituições financeiras com autorização do cliente. Ele importa os extratos de forma contínua e automatizada para a conciliação contábil.',
    keyBenefits: [
      'Elimina cobrança manual de extratos bancários',
      'Integração oficial com +25 bancos e instituições financeiras',
      'Redução drástica do trabalho operacional de digitação e conferência',
      'Maior velocidade e precisão no fechamento contábil mensal'
    ],
    problemSolved: 'O contador perde horas preciossas do mês cobrando extrato bancário do cliente e digitando lançamentos manuais.',
    targetPain: 'Cliente que atrasa envio de extratos bancários e falta de tempo da equipe para fechar balancetes.',
    pitchScript: 'O Conciliador Open Finance do Nibo conecta diretamente com mais de 25 bancos do seu cliente. Você nunca mais precisa enviar mensagem cobrando extrato em PDF ou CSV no fim do mês.',
    discoveryQuestions: [
      'Hoje quanto tempo a sua equipe gasta todo mês cobrando e esperando extratos bancários dos clientes?',
      'Como vocês fazem quando o cliente envia o extrato no dia 28 com pendências de meses anteriores?',
      'Se os extratos chegassem 100% atualizados todo dia no seu sistema sem depender do cliente, o que mudaria na rotina da sua equipe?'
    ],
    objectionHandlers: {
      'Cliente não vai autorizar o Open Finance': 'A autorização do Open Finance é feita em 1 minuto via app do próprio banco e possui o selo de segurança do Banco Central. Temos scripts e materiais que ajudam a conscientizar o cliente.',
      'Já uso sistema contábil com importação': 'Importação ainda depende do arquivo enviado. O Open Finance faz a busca automática direto da instituição financeira sem necessidade de arquivo.'
    }
  },
  {
    id: 'nibo-emissor',
    name: 'Nibo Emissor',
    category: 'Fiscal/Notas',
    shortDescription: 'Emissão descomplicada e automatizada de notas fiscais para o cliente da contabilidade.',
    fullDescription: 'Plataforma para emissão rápida e padronizada de Notas Fiscais de Serviço e Produto. O escritório pré-configura os impostos e retencões, e a emissão fica a um clique de distância.',
    keyBenefits: [
      'Pré-configuração de alíquotas e impostos para evitar erros fiscais',
      'Emissão de notas fiscais em poucos segundos',
      'Padronização de processos repetitivos',
      'Envio automático de XML e PDF para o tomador e para a contabilidade'
    ],
    problemSolved: 'Refaça de notas fiscais emitidas erradas e perda de tempo digitando dados repetitivos.',
    targetPain: 'Clientes cometendo erros em emissão de NFS-e e sobrecarregando o setor fiscal com dúvidas.',
    pitchScript: 'Com o Nibo Emissor, você deixa as regras fiscais pré-configuradas. O processo de emissão fica tão simples que o usuário só precisa informar o valor e clicar em emitir.',
    discoveryQuestions: [
      'Quantas chamadas o seu setor fiscal recebe por semana sobre dúvidas de alíquotas ou retenções em emissão de notas?',
      'Como vocês garantem que os clientes não estão emitindo notas com impostos errados?',
      'Quanto tempo daria para economizar se os clientes emitissem suas notas em uma ferramenta padronizada integrada com a contabilidade?'
    ],
    objectionHandlers: {
      'Cliente já usa emissor da prefeitura': 'O emissor da prefeitura costuma exigir vários campos manuais a cada nota e não integra diretamente com a contabilidade. O Nibo pré-preenche tudo.'
    }
  },
  {
    id: 'nibo-obrigacoes-plus',
    name: 'Nibo Obrigações Plus',
    category: 'Gestão/Operação',
    shortDescription: 'Plataforma principal do ecossistema. Automatização de controle de guias, tarefas internas e rotina operacional.',
    fullDescription: 'O carro-chefe do Nibo. Gerencia todas as obrigações tributárias e trabalhistas do escritório contábil. Controla prazos, armazena comprovantes, envia guias automaticamente aos clientes e monitora a execução do time.',
    keyBenefits: [
      'Controle centralizado de todas as guias e obrigações',
      'Protocolos automáticos de entrega ao cliente',
      'Armazenamento seguro e organizado na nuvem',
      'Visão clara de prazos e fluxo operacional interno do escritório'
    ],
    problemSolved: 'Risco de multas por atraso na entrega de guias, falta de visibilidade sobre o trabalho da equipe e perda de comprovantes de envio.',
    targetPain: 'Gestão caótica de tarefas, dependência de planilhas e medo constante de esquecer uma obrigação e gerar multa para o cliente.',
    pitchScript: 'O Nibo Obrigações Plus é o centro de controle da sua operação contábil. Ele automatiza o envio e protocolo de guias, dando 100% de visibilidade dos prazos do seu time para você nunca mais ser pego de surpresa.',
    discoveryQuestions: [
      'Como você faz hoje para ter certeza absoluta de que todas as guias de impostos de todos os clientes foram enviadas no prazo nesta semana?',
      'Qual foi a última vez que o escritório precisou arcar com uma multa por atraso no envio de obrigação?',
      'Se você pudesse ver em um único painel o status exato de cada departamento em tempo real, quanto tempo de reunião de alinhamento você economizaria?'
    ],
    objectionHandlers: {
      'Já temos um sistema contábil que tem módulo de tarefas': 'Módulos genéricos costumam exigir atualização manual da equipe. O Obrigações Plus é focado na automação e envio automático ao cliente com protocolo.',
      'Minha equipe é pequena, controlo no Excel': 'À medida que o escritório cresce, a planilha falha. Mudar o processo com a equipe menor é muito mais fácil do que arrumar a casa com centenas de clientes.'
    }
  },
  {
    id: 'radar-ecac',
    name: 'Radar e-CAC',
    category: 'Conformidade',
    shortDescription: 'Monitoramento automático da situação fiscal dos clientes na Receita Federal sem acesso manual diário.',
    fullDescription: 'Ferramenta que realiza varreduras automáticas no portal e-CAC do governo federal. Detecta pendências fiscais, malha fina, mensagens da Receita e divergências tributárias sem precisar digitar código de acesso ou certificado digital manualmente para cada cliente.',
    keyBenefits: [
      'Varredura diária e automática no e-CAC',
      'Notificação imediata sobre mensagens e pendências na Receita',
      'Sem necessidade de acessar manualmente cliente por cliente com certificado',
      'Atuação preventiva antes do cliente ser surpreendido pela Receita'
    ],
    problemSolved: 'O contador descobre pendências do cliente na Receita Federal tarde demais, quando já gerou multa ou impedimento de CND.',
    targetPain: 'Perda de tempo logando individualmente no e-CAC de cada cliente com certificado digital.',
    pitchScript: 'O Radar e-CAC varre diariamente a situação fiscal dos seus clientes na Receita Federal. Quando surge uma notificação ou pendência, você descobre no mesmo dia sem ter que entrar no e-CAC cliente por cliente.',
    discoveryQuestions: [
      'Com que frequência sua equipe consegue entrar no e-CAC de cada cliente para checar certidões e caixas de mensagem?',
      'Já aconteceu de um cliente ligar cobrando porque a CND dele travou e ninguém viu antes?',
      'Se o e-CAC de todos os seus 150 clientes fosse verificado automaticamente todo dia, quanta tranquilidade isso traria?'
    ],
    objectionHandlers: {
      'Consultamos quando o cliente pede': 'Consulta reativa gera urgência e apaga incêndio. O Radar e-CAC transforma a contabilidade em consultoria preventiva.'
    }
  },
  {
    id: 'whatsapp-para-contabilidade',
    name: 'WhatsApp para Contabilidade',
    category: 'Comunicação',
    shortDescription: 'Canal corporativo e centralizado para atendimento do escritório contábil aos clientes.',
    fullDescription: 'Integração do WhatsApp ao ecossistema Nibo. Permite número centralizado, múltiplos atendentes, histórico registrado de conversas e envio automatizado de lembretes e guias de impostos diretamente na conversa do cliente.',
    keyBenefits: [
      'Centralização dos números e conversas do escritório',
      'Envio automático de guias e lembretes de vencimento',
      'Histórico completo de atendimentos preservado no escritório',
      'Aumento da taxa de abertura de mensagens para +90%'
    ],
    problemSolved: 'Atendimento disperso em celulares pessoais de funcionários, sem registro do que foi combinado e guias enviadas por e-mail ignoradas.',
    targetPain: 'Clientes ignoram e-mails com guias de impostos e mandam mensagens a qualquer hora nos celulares pessoais da equipe.',
    pitchScript: 'Com o WhatsApp para Contabilidade Nibo, você centraliza os atendimentos do seu time em um único número oficial do escritório e envia as guias diretamente onde o cliente realmente abre e responde.',
    discoveryQuestions: [
      'O que acontece com o histórico de mensagens do cliente se um funcionário da sua equipe pedir demissão hoje?',
      'Qual é a taxa de abertura de e-mails de cobrança versus as mensagens de WhatsApp que vocês enviam?',
      'Quanto tempo a equipe perde reenviando guias no WhatsApp porque o cliente diz que não recebeu no e-mail?'
    ],
    objectionHandlers: {
      'Cliente prefere falar direto no celular do funcionário': 'Ao centralizar no número do escritório, o cliente tem atendimento mais rápido por qualquer atendente disponível, sem depender de uma pessoa só.'
    }
  },
  {
    id: 'aplicativo-personalizado',
    name: 'Aplicativo Personalizado',
    category: 'Comunicação',
    shortDescription: 'App mobile com a marca, logo e cores do escritório contábil para os clientes finais.',
    fullDescription: 'Aplicativo móvel exclusivo e personalizado com o nome e identidade visual da contabilidade na App Store e Google Play. O cliente acessa guias, solicita serviços e recebe notificações de vencimento com a marca do escritório.',
    keyBenefits: [
      'Fortalecimento imenso da marca do escritório contábil',
      'Canal próprio e profissional na App Store e Google Play',
      'Notificações push direto na tela do celular do cliente',
      'Diferencial competitivo para captação e retenção de clientes'
    ],
    problemSolved: 'Percepção de valor baixa pelo cliente, que enxerga a contabilidade apenas como um gerador de boleto.',
    targetPain: 'Falta de diferencial em propostas comerciais contra concorrentes que vendem contabilidade digital barata.',
    pitchScript: 'Imagine seu cliente baixando no celular um aplicativo com o NOME e a MARCA do seu escritório de contabilidade para receber guias e pedir solicitações. É a maior demonstração de profissionalismo que você pode apresentar.',
    discoveryQuestions: [
      'Como o seu escritório se posiciona hoje quando concorda em propostas comerciais contra concorrentes digitais?',
      'Qual impacto teria na percepção de valor dos seus clientes se eles baixassem um app próprio com a sua marca?',
      'Você acha que o seu cliente valoriza mais um e-mail com anexo ou um app próprio com a marca da sua empresa?'
    ],
    objectionHandlers: {
      'Meus clientes são tradicionais e não vão baixar app': 'O app pode ser implantado gradualmente. Para os clientes mais jovens e empresas em crescimento, é um divisor de águas de retenção.'
    }
  }
];

export const PAIN_MATRIX: PainMatrixItem[] = [
  {
    dor: 'Cliente demora para enviar extratos bancários',
    produto: 'Conciliador Open Finance',
    perguntaDescoberta: 'Hoje como vocês fazem para receber os extratos bancários dos clientes no fim do mês?',
    argumentoValor: 'Com o Conciliador Open Finance, o Nibo busca os dados diretamente do banco sem você ter que ficar cobrando e esperando envio em PDF.',
    impactoEsperado: 'Redução de até 80% no tempo gasto cobrando extrato e antecipação no fechamento do balancete.'
  },
  {
    dor: 'Muitas guias de impostos e processos manuais com risco de multa',
    produto: 'Nibo Obrigações Plus',
    perguntaDescoberta: 'Como você faz hoje para acompanhar se todas as guias do mês foram entregues e protocoladas no prazo?',
    argumentoValor: 'O Obrigações Plus automatiza o controle de prazos e envio ao cliente com protocolo automático de entrega.',
    impactoEsperado: 'Eliminação do risco de multas por esquecimento e visão em tempo real da produtividade do escritório.'
  },
  {
    dor: 'Cliente emite nota fiscal errada e liga tirando dúvidas fiscais',
    produto: 'Nibo Emissor',
    perguntaDescoberta: 'Quanto tempo o seu setor fiscal gasta corrigindo notas emitidas incorretamente pelos clientes?',
    argumentoValor: 'Você pré-configura a regra fiscal e o cliente emite a nota padronizada em segundos sem errar.',
    impactoEsperado: 'Diminuição de chamados operacionais no fiscal e retenção de alíquotas corretas.'
  },
  {
    dor: 'Acesso diário e exaustivo ao e-CAC da Receita Federal',
    produto: 'Radar e-CAC',
    perguntaDescoberta: 'Como é o processo da sua equipe para checar pendências e mensagens na caixa postal do e-CAC dos clientes?',
    argumentoValor: 'O Radar e-CAC varre o portal diariamente e avisa sobre novidades ou travamento de certidões automaticamente.',
    impactoEsperado: 'Detecção preventiva de problemas fiscais antes de afetar as certidões e CND do cliente.'
  },
  {
    dor: 'Comunicação informal no WhatsApp pessoal da equipe',
    produto: 'WhatsApp para Contabilidade',
    perguntaDescoberta: 'Como você garante que as conversas do escritório ficam registradas se um colaborador sair hoje?',
    argumentoValor: 'Centraliza todos os atendimentos num canal corporativo oficial e envia guias diretamente por mensagem.',
    impactoEsperado: 'Aumento da taxa de abertura de guias para +90% e histórico 100% preservado pelo escritório.'
  },
  {
    dor: 'Dificuldade de diferenciar o escritório em propostas comerciais',
    produto: 'Aplicativo Personalizado',
    perguntaDescoberta: 'Qual é o seu grande diferencial hoje quando você envia uma proposta comercial para um novo cliente?',
    argumentoValor: 'Entregar um aplicativo com a SUA marca para o cliente acessar guias e solicitações fortalece o posicionamento premium.',
    impactoEsperado: 'Aumento na taxa de conversão de propostas comerciais e valorização dos honorários contábeis.'
  }
];
