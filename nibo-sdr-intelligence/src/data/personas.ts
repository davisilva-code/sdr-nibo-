import { Persona } from '../types';

export const PERSONAS_LIST: Persona[] = [
  {
    id: 'persona-autonomo',
    name: 'Roberto Silva',
    role: 'Contador Autônomo',
    firmType: 'Contabilidade Individual / Home Office',
    size: '1 a 25 clientes',
    mindset: 'Faz tudo sozinho. É o comercial, o operário, o atendimento e o financeiro.',
    keyFears: ['Perder clientes por falta de agilidade', 'Atrasar impostos e pagar do próprio bolso', 'Não conseguir férias nunca'],
    mainPains: ['Falta de tempo absurda', 'Clientes que enviam documentos atrasados pelo WhatsApp em foto mal tirada', 'Sobrecarga de tarefas braçais'],
    behavior: 'Ocupado, atende telefone arfando ou no meio do trânsito. Quer soluções pragmáticas e baratas que economizem seu tempo vital.',
    decisionCriteria: ['Preço acessível', 'Facilidade extrema de uso', 'Tempo economizado no dia a dia']
  },
  {
    id: 'persona-pequeno',
    name: 'Juliana Mendes',
    role: 'Sócia Fundadora',
    firmType: 'Escritório Pequeno com Equipe Reduzida',
    size: '25 a 80 clientes (3 colaboradores)',
    mindset: 'Em transição entre operador e gestor. Quer crescer mas a operação consome o dia todo.',
    keyFears: ['Errantes da equipe causarem multas', 'Perder o controle com o aumento de carteira', 'Rotatividade de estagiários'],
    mainPains: ['Cobrança manual de extratos bancários', 'Equipe perde tempo reenviando guias que cliente disse que não recebeu', 'Falta de padrão nos processos'],
    behavior: 'Simpática porém objetiva. Escuta com atenção se perceber que a solução traz organização para o time.',
    decisionCriteria: ['Facilidade de engajar a equipe', 'Processos padronizados', 'Custo-benefício']
  },
  {
    id: 'persona-medio-manual',
    name: 'Carlos Alberto Ferreira',
    role: 'Sócio-Diretor',
    firmType: 'Escritório Médio Tradicional',
    size: '80 a 250 clientes (12 colaboradores)',
    mindset: 'Escritório consolidado há 15 anos. Muitos processos em planilhas Excel e papel.',
    keyFears: ['Resistência da equipe velha de casa', 'Custo de implantação e perda de tempo no treinamento', 'Erros operacionais em lote'],
    mainPains: ['Planilhas de controle que vivem desatualizadas', 'Falta de visibilidade do que a equipe está fazendo', 'Extratos bancários travando o fechamento do mês'],
    behavior: 'Desconfiado com promessas de automação "mágica". Exige ver provas, cases e entender como funciona na prática.',
    decisionCriteria: ['Segurança e estabilidade', 'Suporte pós-venda garantido', 'Integração com sistema contábil atual']
  },
  {
    id: 'persona-grande',
    name: 'Eduardo Camargo',
    role: 'Diretor de Operações / COO',
    firmType: 'Escritório Grande / Corporativo',
    size: '250+ clientes (35+ colaboradores)',
    mindset: 'Foco total em métricas de produtividade, SLA de atendimento, margem de lucro por cliente e governança.',
    keyFears: ['Instabilidade de sistema que pare a equipe de 40 pessoas', 'Vazamento de dados / LGPD', 'Insatisfação de grandes clientes'],
    mainPains: ['Volume massivo de guias para processar', 'Dificuldade de mensurar capacidade operacional por analista', 'Acessos manuais ao e-CAC engargalados'],
    behavior: 'Formal, analítico, exige dados de ROI, integrações via API e SLA corporativo.',
    decisionCriteria: ['Segurança LGPD e criptografia', 'Escalabilidade para volume massivo', 'Métricas de gestão e relatórios']
  },
  {
    id: 'persona-resistente',
    name: 'Geraldo Antunes',
    role: 'Sócio Sênior (Contador Tradicional)',
    firmType: 'Escritório Tradicional (20+ anos de mercado)',
    size: '100 clientes',
    mindset: '"Sempre fiz assim e deu certo. Pra que mudar?" Tem aversão a modismos tecnológicos.',
    keyFears: ['A tecnologia falhar e ele passar vergonha', 'Ser enganado por vendedor de TI', 'Complicar o que já funciona no papel/Excel'],
    mainPains: ['Equipe vive sobrecarregada mas ele acha que a culpa é da falta de empenho', 'Clientes reclamation do atraso no balanço'],
    behavior: 'Ríspido, interrompe bastante, diz que "tecnologia só serve pra dar dor de cabeça". Precisa de paciência e foco na segurança.',
    decisionCriteria: ['Sem risco de errar', 'Testes sem compromisso', 'Garantia de atendimento humano']
  },
  {
    id: 'persona-tecnologico',
    name: 'Lucas Prado',
    role: 'Sócio de Inovação / Contabilidade Digital',
    firmType: 'Contabilidade Consultiva / Tech',
    size: '150 clientes',
    mindset: 'Adora novidades, usa IA, automações e busca escalar o escritório sem aumentar headcount.',
    keyFears: ['Ficar para trás em relação às Big Techs da contabilidade', 'Sistemas fechados que não integram via API'],
    mainPains: ['Ferramentas que prometem Open Finance mas caem direto', 'Sistemas com visual antigo dos anos 90'],
    behavior: 'Rápido, empolgado, faz perguntas técnicas sobre APIs, Open Finance, conectividade e UX.',
    decisionCriteria: ['Tecnologia de ponta (Open Finance, IA)', 'Interface moderna e API aberta', 'Visão de futuro da empresa']
  },
  {
    id: 'persona-concorrente',
    name: 'Fernanda Rocha',
    role: 'Gestora de Processos',
    firmType: 'Escritório Médio',
    size: '120 clientes',
    mindset: 'Utiliza uma ferramenta concorrente (Acessórias / Gestta) mas sente faltas pontuais.',
    keyFears: ['A dor de cabeça de migrar de sistema', 'Ter que cadastrar tudo de novo'],
    mainPains: ['Busca de extrato bancário no concorrente depende de arquivo', 'Falta de monitoramento e-CAC nativo'],
    behavior: 'Compara tudo com a ferramenta atual dela. Pergunta se o Nibo faz X ou Y que o concorrente faz.',
    decisionCriteria: ['Diferenciais exclusivos claros', 'Migração fácil de dados', 'Benefício visível sobre a ferramenta atual']
  },
  {
    id: 'persona-proprietario',
    name: 'Marcelo Costa',
    role: 'Sócio Proprietário',
    firmType: 'Escritório Contábil PME',
    size: '90 clientes',
    mindset: 'Preocupado com faturamento, retenção de clientes e margem de lucro.',
    keyFears: ['Perder clientes para concorrentes digitais mais baratos', 'Custos fixos altos'],
    mainPains: ['Dificuldade de cobrar honorários mais altos', 'Sensação de que o cliente não valoriza o trabalho da contabilidade'],
    behavior: 'Visão de negócios. Quer saber como o Nibo ajuda ele a encantar o cliente e vender mais.',
    decisionCriteria: ['Impacto na percepção do cliente final (App Próprio)', 'Retorno sobre o investimento', 'Retenção de clientes']
  },
  {
    id: 'persona-gerente-op',
    name: 'Patrícia Souza',
    role: 'Gerente Operacional',
    firmType: 'Escritório Médio/Grande',
    size: '200 clientes',
    mindset: 'Mão na massa total. É cobrada pelo sócio por resultados e pela equipe por suporte.',
    keyFears: ['A equipe entrar em greve de uso da ferramenta', 'Ferramenta nova gerar mais trabalho ao invés de menos'],
    mainPains: ['Equipe reclamando de retrabalho', 'Falta de braço para dar conta das demandas no pico do mês'],
    behavior: 'Pragmática. Quer entender a usabilidade do dia a dia da equipe, tela por tela.',
    decisionCriteria: ['Facilidade para a equipe usar', 'Diminuição de retrabalho', 'Relatórios operacionais simples']
  },
  {
    id: 'persona-resp-fiscal',
    name: 'Bruno Lima',
    role: 'Coordenador do Departamento Fiscal',
    firmType: 'Escritório Contábil',
    size: '150 clientes',
    mindset: 'Especialista em legislação, apuração de impostos e prazos do Fisco.',
    keyFears: ['Perder prazo de entrega de DAS/DARF e gerar multa', 'Cliente emitir nota com CFOP ou alíquota errada'],
    mainPains: ['Clientes solicitando refaça de notas fiscais', 'Entrar no e-CAC de dezenas de clientes diariamente'],
    behavior: 'Detalhista, técnico, preocupado com validações fiscais e conformidade.',
    decisionCriteria: ['Precisão nos cálculos e regras fiscais', 'Radar e-CAC automático', 'Emissão de notas sem erros']
  }
];
