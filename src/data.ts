import { Testimonial, CourseModule, FAQItem, InstructorProfile } from './types';
import instructorPhoto from './assets/images/regenerated_image_1784544660370.png';

export const STATS = [
  { value: '¥1.600 - ¥3.000', label: 'Salário Médio por Hora', desc: 'Praticamente o dobro de uma fábrica comum' },
  { value: '+1.200', label: 'Alunos Formados', desc: 'Brazilienses e latinos atuantes no Japão' },
  { value: '92%', label: 'Taxa de Empregabilidade', desc: 'Alunos contratados logo após formarem' },
  { value: '100%', label: 'Aulas em Português', desc: 'Explicações fáceis e didática direta' },
];

export const COMPARISONS = {
  haken: {
    title: 'Fábrica Comum (Haken Geral)',
    items: [
      'Salário estagnado (¥1.050 a ¥1.250/hora)',
      'Trabalho repetitivo e exaustivo na esteira',
      'Risco constante de demissão repentina (hanten)',
      'Sem perspectiva de crescimento ou plano de carreira',
      'Desvalorização profissional e pouca autonomia',
    ],
  },
  welder: {
    title: 'Soldador Profissional Certificado',
    items: [
      'Salários elevados (¥1.600 a ¥3.000+/hora)',
      'Trabalho técnico, intelectual e de precisão',
      'Profissão altamente requisitada em todo o Japão',
      'Carreira sólida com aumento salarial contínuo',
      'Respeito profissional e estabilidade contratual',
    ],
  },
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Thiago Oliveira',
    location: 'Ota, Gunma',
    previousJob: 'Operador de Prensa (¥1.150/h)',
    currentJob: 'Soldador TIG de Precisão (¥1.980/h)',
    text: 'Trabalhava 12h por dia na prensa, exausto e sem perspectiva alguma de melhorar. O curso do Centro Mendes de Soldagem mudou a minha vida completamente. Aprendi solda TIG do absoluto zero. O suporte em português foi essencial porque meu japonês é básico. Hoje ganho quase o dobro, tenho finais de semana livres e sou respeitado na fábrica. Valeu cada iene investido!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcos Tanaka',
    location: 'Toyohashi, Aichi',
    previousJob: 'Separador de Peças (¥1.200/h)',
    currentJob: 'Soldador MIG/MAG Industrial (¥1.850/h)',
    text: 'Super recomendo o curso do Professor William! Ele ensina com muita paciência e didática impecável. As cabines de treino são individuais e idênticas às das grandes indústrias metalúrgicas japonesas. Consegui tirar a licença oficial da JWES nas primeiras semanas após o curso e fui contratado por indicação direta da escola. Excelente infraestrutura.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priscila Souza',
    location: 'Hamamatsu, Shizuoka',
    previousJob: 'Embaladora de Bento (¥1.050/h)',
    currentJob: 'Soldadora TIG em Inox (¥1.750/h)',
    text: 'Sempre achei que soldagem era uma profissão estritamente masculina, mas o Centro Mendes de Soldagem me acolheu de forma fantástica. O Professor William me ensinou a técnica fina de precisão na soldagem TIG de aço inox. Hoje trabalho em uma fábrica limpa, soldando peças de alta tecnologia. Conquistei minha independência financeira aqui no Japão!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Rafael Santos',
    location: 'Yokkaichi, Mie',
    previousJob: 'Operador de Moldagem Plástica (¥1.250/h)',
    currentJob: 'Soldador Especialista & Inspetor (¥2.200/h)',
    text: 'O cronograma flexível de finais de semana foi perfeito. Consegui estudar sem precisar pedir as contas do meu serviço antigo. O investimento no curso se pagou em menos de 3 meses de trabalho como soldador profissional. Hoje não dependo mais de agência exploradora, tenho contrato direto (Keiyaku-shain) e estabilidade financeira.',
    rating: 5,
  },
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: Segurança, Teoria & Solda Eletrodo (MMA)',
    duration: '16 Horas de Treinamento',
    tag: 'Básico',
    description: 'Fundamentos essenciais de segurança do trabalho industrial japonês (Anzen Daiichi), conhecimento de metais e prática com soldagem de eletrodo revestido.',
    lessons: [
      'Normas rígidas de segurança industrial e prevenção de acidentes no Japão',
      'Configuração e regulagem fina de fontes de solda e corrente elétrica',
      'Técnicas de ignição do arco elétrico e manutenção de poça de fusão',
      'Soldagem de união de chapas de aço carbono na posição plana',
    ],
    skillsLearned: ['Segurança Industrial Japonesa', 'Preparação de Metais', 'Uso correto de EPIs', 'Fundamentos de Solda a Arco'],
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Soldagem Semi-Automática (MIG/MAG - CO2)',
    duration: '32 Horas de Treinamento',
    tag: 'Intermediário',
    description: 'Domine a soldagem por arame sólido e tubular com proteção gasosa. É o processo mais exigido no Japão para fabricação de autopeças, chassis e maquinários.',
    lessons: [
      'Estudo dos gases de proteção (CO2, Argônio e Misturas de Solda)',
      'Técnicas avançadas de transferência por curto-circuito e spray-arc',
      'Soldagem em múltiplas posições: Plana, Horizontal e Vertical Ascendente',
      'Controle de velocidade de alimentação do arame e detecção de porosidades',
    ],
    skillsLearned: ['Soldagem MIG/MAG CO2', 'Ajuste de Fluxo de Gás', 'Soldagem de Autopeças', 'Prevenção de Trincas e Falhas'],
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Soldagem de Precisão Premium (TIG / Inox / Alumínio)',
    duration: '40 Horas de Treinamento',
    tag: 'Avançado',
    description: 'Domine a solda mais nobre e bem remunerada do mercado industrial. Foco total em peças finas, tubulações, aço inoxidável e ligas de alumínio de alta tecnologia.',
    lessons: [
      'Montagem e conservação de tochas TIG, afiação correta do Tungstênio',
      'Técnica avançada de adição de metal de aporte (coordenação de duas mãos)',
      'Soldagem de chapas finas de aço inoxidável sem deformações',
      'Técnicas de acabamento estético impecável, purga de gás e soldagem sanitária',
    ],
    skillsLearned: ['Solda TIG de Alta Precisão', 'Trabalho com Aço Inox', 'Soldagem de Alumínio', 'Acabamento Estético Industrial'],
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Certificação Japonesa JWES & Empregabilidade',
    duration: '12 Horas de Treinamento',
    tag: 'Profissional',
    description: 'Preparação definitiva para passar na prova prática de licença oficial japonesa e estratégias de inserção imediata no mercado de trabalho de elite.',
    lessons: [
      'Simulados idênticos ao teste prático oficial da JWES (Japan Welding Engineering Society)',
      'Dicionário prático com vocabulário de solda e engenharia em japonês',
      'Elaboração de currículo técnico profissional japonês (Rirekisho)',
      'Treinamento para testes de soldagem práticos em entrevistas de emprego',
    ],
    skillsLearned: ['Aprovação nos Testes JWES', 'Linguagem Técnica Japonesa', 'Currículo Rirekisho de Alto Impacto', 'Segredos do Teste Técnico'],
  },
];

export const INSTRUCTOR: InstructorProfile = {
  name: 'Prof. William Mendes',
  role: 'Fundador & Instrutor Principal',
  experienceYears: 18,
  photoUrl: instructorPhoto,
  certifications: [
    'Certificação JWES Grau Especial (Japan Welding Engineering Society)',
    'Ex-Supervisor Chefe de Soldagem e Controle de Qualidade na Mitsubishi Heavy Industries',
    'Mais de 1.200 soldadores treinados, certificados e empregados no Japão',
    'Especialista Convidado em Métodos de Soldagem TIG de Alta Precisão',
  ],
  bio: 'Nascido no Brasil, William migrou para o Japão em 2008 como tantos outros dekasseguis. Enfrentou anos trabalhando 12 horas diárias em linhas exaustivas de montagem de autopeças por baixos salários. Determinado a mudar seu destino, investiu seu tempo e recursos no aprendizado técnico da soldagem industrial. Após conquistar as maiores licenças estatais do Japão e trabalhar como soldador sênior em estaleiros e fábricas de alta confiabilidade, decidiu fundar o Centro Mendes de Soldagem. Sua paixão é capacitar brasileiros para que conquistem independência financeira, estabilidade profissional e saiam de forma definitiva da rotina maçante das fábricas comuns.',
  trajectory: [
    {
      year: '2008',
      title: 'Chegada ao Japão como Dekassegui',
      description: 'Início da jornada trabalhando pesado em metalúrgica geral, operando prensas mecânicas sob alto cansaço físico.',
    },
    {
      year: '2011',
      title: 'Descoberta da Profissão de Soldagem',
      description: 'Após longos estudos, conquistou sua primeira licença básica oficial japonesa e ingressou como ajudante de soldador.',
    },
    {
      year: '2015',
      title: 'Destaque e Estaleiros Nacionais',
      description: 'Contratado por uma das maiores corporações navais do Japão, operando soldagem pesada de precisão MIG e TIG em tanques e navios.',
    },
    {
      year: '2019',
      title: 'Nível Máximo de Certificação JWES',
      description: 'Obteve as raras e disputadas certificações técnicas avançadas de solda japonesas, habilitando-o como mestre e supervisor.',
    },
    {
      year: '2021',
      title: 'Nascimento do Centro Mendes de Soldagem',
      description: 'Fundou o centro de treinamento prático 100% em português com o objetivo de gerar empregabilidade real para a comunidade estrangeira no Japão.',
    },
  ],
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Geral',
    question: 'Não falo japonês fluente. Consigo fazer o curso e trabalhar?',
    answer: 'Sim, totalmente! Nosso método foi desenvolvido exclusivamente para brasileiros. Toda a nossa teoria e prática de ensino são ministradas 100% em português. Além do aprendizado da soldagem, nós ensinamos os principais termos e comandos em japonês técnico industrial (como "Anzen Daiichi", "Yousetsu", etc.) que você ouvirá nas fábricas. Isso garante que você execute o serviço com segurança e passe em testes de emprego mesmo com japonês básico.',
  },
  {
    id: 'faq-2',
    category: 'Aulas',
    question: 'Como funcionam os horários das aulas? Consigo continuar no meu emprego?',
    answer: 'Com certeza. Nosso curso foi planejado para quem trabalha de segunda a sexta em período integral. Oferecemos turmas flexíveis aos sábados ou aos domingos. Assim, você faz sua transição de carreira de forma segura, mantendo sua fonte de renda atual enquanto se qualifica.',
  },
  {
    id: 'faq-3',
    category: 'Prática',
    question: 'A escola oferece infraestrutura individual para os alunos treinar?',
    answer: 'Sim, este é um dos nossos maiores orgulhos. Na nossa escola, você não divide máquina ou cabine. Cada aluno possui sua própria cabine de solda industrial privativa, equipada com tochas TIG, tochas MIG/MAG de última geração, máscara eletrônica automática, lixadeiras e todos os metais necessários para o treino prático contínuo. É 90% prática de mão na massa.',
  },
  {
    id: 'faq-4',
    category: 'Emprego',
    question: 'Como funciona a indicação de vagas e o suporte de emprego?',
    answer: 'Nós temos uma rede sólida de contatos com empreiteiras (haken) e fábricas metalúrgicas em províncias de forte presença industrial, como Gunma, Aichi, Shizuoka, Mie, Ibaraki e Saitama. Indicamos os alunos formados para processos seletivos e preparamos você para o teste prático exigido nas entrevistas, o que eleva muito as taxas de contratação.',
  },
  {
    id: 'faq-5',
    category: 'Iniciantes',
    question: 'Nunca soldei nada na vida. Esse curso é para mim?',
    answer: 'Sim! Mais de 80% dos nossos alunos de sucesso começaram exatamente do absoluto zero, muitos deles vindo de serviços de logística, limpeza ou empacotamento de bento. Nossa metodologia é de evolução contínua e individualizada. O Professor William acompanha seu progresso lado a lado, ajustando sua pegada, velocidade da mão e leitura de poça de fusão até você se sentir seguro.',
  },
  {
    id: 'faq-6',
    category: 'Financeiro',
    question: 'Quais são as formas de pagamento e facilidades?',
    answer: 'Nós facilitamos para que todos os trabalhadores possam estudar. Oferecemos parcelamento no cartão de crédito em até 12x, pagamento facilitado por boleto de convênio japonês (Konbini) ou transferência direta com descontos especiais para pagamentos à vista. Fale com um de nossos consultores para fazer uma simulação personalizada.',
  },
];
