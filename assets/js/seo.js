/* ============================================================
   DATALYZER LATAM · SEO · JSON-LD Structured Data
   Cobertura: Argentina + toda LATAM hispanohablante
   (Colombia, Chile, Perú, Uruguay, Bolivia, Ecuador, Paraguay,
    Venezuela, Centroamérica, Caribe hispanohablante)
============================================================ */
(function () {
  var BASE = 'https://datalyzer-verticales.vercel.app';
  var path = window.location.pathname.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '') || '/';

  /* ── Shared: Organization + LocalBusiness ─────────────── */
  inject({
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': BASE + '/#organization',
    name: 'Datalyzer LATAM',
    legalName: 'Representante oficial Datalyzer para Argentina y LATAM',
    url: BASE,
    description: 'Representante oficial de Datalyzer para Argentina y América Latina hispanohablante. Software SPC, FMEA, APQP y MSA para control de calidad industrial.',
    telephone: '+541154797426',
    email: 'mwyler@datalyzer.com',
    address: { '@type': 'PostalAddress', addressCountry: 'AR', addressRegion: 'Buenos Aires' },
    areaServed: [
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'Chile' },
      { '@type': 'Country', name: 'Perú' },
      { '@type': 'Country', name: 'Uruguay' },
      { '@type': 'Country', name: 'Bolivia' },
      { '@type': 'Country', name: 'Ecuador' },
      { '@type': 'Country', name: 'Paraguay' },
      { '@type': 'Country', name: 'Venezuela' },
      { '@type': 'Country', name: 'Costa Rica' },
      { '@type': 'Country', name: 'Guatemala' },
      { '@type': 'Country', name: 'Honduras' },
      { '@type': 'Country', name: 'El Salvador' },
      { '@type': 'Country', name: 'Nicaragua' },
      { '@type': 'Country', name: 'Panamá' },
      { '@type': 'Country', name: 'República Dominicana' }
    ],
    knowsLanguage: ['es'],
    sameAs: ['https://www.datalyzer.com'],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Datalyzer International BV',
      url: 'https://www.datalyzer.com',
      address: { '@type': 'PostalAddress', addressCountry: 'NL' }
    }
  });

  /* ── Shared: SoftwareApplication ─────────────────────── */
  inject({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': BASE + '/#software',
    name: 'Datalyzer SPC Suite',
    alternateName: ['Datalyzer Qualys', 'Software SPC LATAM', 'Software FMEA APQP LATAM'],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, Web',
    description: 'Suite de software SPC, FMEA, APQP y MSA para control estadístico de procesos industriales en América Latina. Más de 4.000 plantas en 50 países.',
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', areaServed: 'Latin America' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '218', bestRating: '5' },
    featureList: [
      'Control estadístico de procesos (SPC) en tiempo real',
      'Cartas de control X̄-R, X̄-S, CUSUM, EWMA, p, np, c, u',
      'Análisis de capacidad Cpk, Ppk, Cm, Cmk',
      'FMEA de Diseño y Proceso (DFMEA / PFMEA)',
      'APQP y Control Plans',
      'MSA / Gage R&R (cruzado y anidado)',
      'Integración OPC-UA, MQTT, Modbus TCP, REST API',
      'Integración SAP, Oracle, Dynamics 365',
      'Integración balanzas Mettler-Toledo, Sartorius, Ohaus',
      'FDA 21 CFR Part 11 — firma electrónica e historial inmutable',
      'ISO 9001:2015, IATF 16949, HACCP, ISO 22000, GMP, ANMAT, INVIMA, ISP, EMA'
    ],
    softwareVersion: 'Qualys 2.x',
    provider: { '@id': BASE + '/#organization' }
  });

  /* ── Page router ─────────────────────────────────────── */
  var pages = {
    '/':              schemaIndex,
    '/index':         schemaIndex,
    '/alimentos':     schemaAlimentos,
    '/quimicos':      schemaQuimicos,
    '/farmaceutica':  schemaFarmaceutica,
    '/aseo':          schemaAseo,
    '/manufactura':   schemaManufactura,
    '/empaque':       schemaEmpaque
  };
  var fn = pages[path] || schemaIndex;
  fn().forEach(inject);

  /* ════════════════════════════════════════════════════════
     PAGE SCHEMAS
  ════════════════════════════════════════════════════════ */

  function schemaIndex() {
    return [
      breadcrumb([{ name: 'Inicio', url: BASE }]),

      /* ── VideoObject · 4 product demos ──────────────────── */
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Datalyzer SPC — Videos de producto',
        description: 'Demos reales del software SPC, FMEA, APQP y MSA de Datalyzer para industria en América Latina.',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'VideoObject',
              name: 'Datalyzer Qualis SPC — Demo en vivo',
              description: 'Demostración real del software SPC Qualis de Datalyzer: dashboard de control estadístico de procesos, cartas de control X̄-R en tiempo real y análisis de capacidad Cpk para industria en Argentina y LATAM.',
              thumbnailUrl: 'https://img.youtube.com/vi/QEviu1-IJtU/maxresdefault.jpg',
              uploadDate: '2024-01-01',
              contentUrl: 'https://www.youtube.com/watch?v=QEviu1-IJtU',
              embedUrl: 'https://www.youtube.com/embed/QEviu1-IJtU',
              publisher: { '@id': BASE + '/#organization' },
              inLanguage: 'es',
              about: { '@id': BASE + '/#software' }
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'VideoObject',
              name: 'Suite APQP Datalyzer — SPC, FMEA, MSA y Calibración web',
              description: 'Presentación de la suite completa de software APQP de Datalyzer: módulos SPC, FMEA, MSA y Calibración integrados en una plataforma web para manufactura industrial en Argentina, Colombia, Chile, Perú y LATAM.',
              thumbnailUrl: 'https://img.youtube.com/vi/QCwcm1qz7TI/maxresdefault.jpg',
              uploadDate: '2025-04-04',
              contentUrl: 'https://www.youtube.com/watch?v=QCwcm1qz7TI',
              embedUrl: 'https://www.youtube.com/embed/QCwcm1qz7TI',
              publisher: { '@id': BASE + '/#organization' },
              inLanguage: 'en',
              about: { '@id': BASE + '/#software' }
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'VideoObject',
              name: 'Datalyzer Qualis 4.0 SPC — Recolección de datos en tiempo real',
              description: 'Demostración de Datalyzer Qualis 4.0: software SPC de última generación para recolección de datos en tiempo real, configuración flexible y análisis estadístico en planta industrial. Disponible para Argentina y toda América Latina.',
              thumbnailUrl: 'https://img.youtube.com/vi/cKs2RCFqwDo/maxresdefault.jpg',
              uploadDate: '2024-09-13',
              contentUrl: 'https://www.youtube.com/watch?v=cKs2RCFqwDo',
              embedUrl: 'https://www.youtube.com/embed/cKs2RCFqwDo',
              publisher: { '@id': BASE + '/#organization' },
              inLanguage: 'en',
              about: { '@id': BASE + '/#software' }
            }
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'VideoObject',
              name: 'Integración FMEA y SPC — Control Plan vinculado en Datalyzer',
              description: 'Ejemplo APQP: cómo el Control Plan y el módulo SPC están vinculados en la suite de software Datalyzer para industria automotriz y manufactura de precisión bajo IATF 16949 en América Latina.',
              thumbnailUrl: 'https://img.youtube.com/vi/-vaElqxNNRM/maxresdefault.jpg',
              uploadDate: '2022-08-25',
              contentUrl: 'https://www.youtube.com/watch?v=-vaElqxNNRM',
              embedUrl: 'https://www.youtube.com/embed/-vaElqxNNRM',
              publisher: { '@id': BASE + '/#organization' },
              inLanguage: 'en',
              about: { '@id': BASE + '/#software' }
            }
          }
        ]
      },

      faq([
        {
          q: '¿Qué es el software SPC y para qué sirve en la industria?',
          a: 'SPC (Statistical Process Control) es una metodología que usa cartas de control estadístico para monitorear la variabilidad de un proceso industrial en tiempo real. Permite detectar causas de variación antes de que generen defectos, reduciendo rechazos, retrabajos y recalls. Datalyzer es la plataforma SPC líder para la industria en Argentina, Colombia, Chile, Perú, Ecuador, Uruguay, Paraguay y toda América Latina hispanohablante.'
        },
        {
          q: '¿Datalyzer es una alternativa a Minitab para la industria en América Latina?',
          a: 'Sí. A diferencia de Minitab, que es una herramienta de análisis estadístico off-line, Datalyzer está diseñado para producción industrial en tiempo real con integraciones nativas a SCADA, MES, ERP y balanzas. Incluye FMEA, APQP y MSA integrados en una sola plataforma, con soporte oficial en español para Argentina, Colombia, Chile, Perú, Uruguay, Ecuador, Paraguay, Bolivia, Venezuela y toda América Latina hispanohablante.'
        },
        {
          q: '¿Cómo se compara Datalyzer con InfinityQS, WinSPC o SPC for Excel en LATAM?',
          a: 'Datalyzer supera a InfinityQS, WinSPC y SPC for Excel en LATAM en: integración con sistemas industriales, soporte local en español, módulos FMEA y APQP integrados, y precio adaptado al mercado latinoamericano. InfinityQS y WinSPC no tienen representación oficial en la mayoría de países de América Latina; SPC for Excel no tiene capacidades FMEA ni integración industrial nativa.'
        },
        {
          q: '¿Datalyzer es una alternativa a JMP (SAS) para calidad industrial en LATAM?',
          a: 'Para entornos de producción industrial en América Latina, Datalyzer es más adecuado que JMP/SAS. JMP es excelente para análisis estadístico exploratorio off-line; Datalyzer está optimizado para SPC en línea, FMEA, APQP y cumplimiento normativo (IATF 16949, FDA 21 CFR 11, INVIMA, ANMAT, ISP) en plantas industriales de Colombia, Chile, Argentina, Perú y toda LATAM.'
        },
        {
          q: '¿Qué industrias puede usar Datalyzer en Colombia, Chile, Perú, Ecuador y LATAM?',
          a: 'Datalyzer tiene verticales configuradas para: alimentos y bebidas (HACCP, ISO 22000, INVIMA, SENASAG, ARCSA), farmacéutica (FDA 21 CFR 11, INVIMA, ISP, DIGEMID, ANMAT), química (REACH, GHS, ISO 9001), aseo y cosmética (ISO 22716, GMP), manufactura industrial (IATF 16949, ISO 9001) y empaque (ISO 10149, leak test). Disponible en todos los países de América Latina hispanohablante.'
        },
        {
          q: '¿En qué países de América Latina está disponible Datalyzer?',
          a: 'Datalyzer está disponible en toda América Latina hispanohablante: Argentina, Colombia, Chile, Perú, Uruguay, Bolivia, Ecuador, Paraguay, Venezuela, Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua, Panamá y República Dominicana. El representante oficial en Argentina brinda soporte en español para toda la región.'
        },
        {
          q: '¿Qué diferencia tiene contratar Datalyzer a través del representante en Argentina para LATAM?',
          a: 'El representante oficial para Argentina y LATAM ofrece: soporte técnico en español en zona horaria ARG (UTC-3), atención directa por WhatsApp sin sistema de tickets, licencias auténticas con garantía de fabricante, e implementación adaptada a las normativas regulatorias de cada país LATAM (ANMAT, INVIMA, ISP, DIGEMID, ARCSA, SENASAG, SENAVE). Sin demoras ni barreras de idioma.'
        },
        {
          q: '¿Qué módulos incluye la suite Datalyzer para la industria en LATAM?',
          a: 'La suite Datalyzer incluye: SPC con más de 20 tipos de cartas de control, FMEA (Diseño y Proceso con metodología AIAG-VDA), APQP con Control Plans y características especiales, MSA/Gage R&R (repetibilidad y reproducibilidad), y análisis de capacidad Cpk/Ppk. Todos integrados en una plataforma disponible en español para toda América Latina.'
        },
        {
          q: '¿Datalyzer se puede comparar con Qualtek, PQ Systems o AssurX en América Latina?',
          a: 'Datalyzer compite con Qualtek, PQ Systems (CHARTrunner, SQCpack) y AssurX en el segmento de software SPC industrial. La ventaja diferencial en LATAM es: representación oficial local, soporte en español, 40+ años de desarrollo específico para manufactura, más de 4.000 clientes en 50 países, y conocimiento de las regulaciones de cada país latinoamericano.'
        }
      ])
    ];
  }

  function schemaAlimentos() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Alimentos & Bebidas', url: BASE + '/alimentos' }
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Datalyzer SPC para Industria Alimentaria LATAM',
        description: 'Software SPC para control de calidad en plantas de alimentos y bebidas en Argentina, Colombia, Chile, Perú y toda América Latina. HACCP, ISO 22000, FSSC 22000, INVIMA, SENASAG, ARCSA, SENAVE.',
        brand: { '@id': BASE + '/#organization' },
        category: 'Software de Calidad para Industria Alimentaria',
        audience: { '@type': 'BusinessAudience', audienceType: 'Plantas de alimentos, bebidas, procesadoras, frigoríficos, panificadoras en América Latina' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '218', bestRating: '5' }
      },
      faq([
        {
          q: '¿Qué software SPC se usa en la industria alimentaria de Argentina, Colombia, Chile y LATAM?',
          a: 'Datalyzer es el software SPC de referencia para la industria alimentaria en Argentina (SENASA/ANMAT), Colombia (INVIMA), Chile (SEREMI/SAG), Perú (SENASA-Perú), Ecuador (ARCSA), Bolivia (SENASAG), Paraguay (SENAVE) y toda América Latina. Controla peso neto, temperatura, pH, Brix y aw en tiempo real cumpliendo HACCP, ISO 22000 y los requisitos regulatorios locales de cada país.'
        },
        {
          q: '¿Cómo ayuda Datalyzer a cumplir con HACCP e ISO 22000 en Argentina y Colombia?',
          a: 'Datalyzer genera automáticamente los registros de control de puntos críticos (PCC) requeridos por HACCP e ISO 22000, detecta desviaciones en tiempo real y emite alertas inmediatas. Los reportes de auditoría se generan con un clic, reduciendo el tiempo de preparación hasta un 70%. Válido para SENASA (Argentina), INVIMA (Colombia), SAG (Chile) y demás autoridades alimentarias LATAM.'
        },
        {
          q: '¿Puedo controlar el peso neto de productos con Datalyzer en plantas de alimentos de LATAM?',
          a: 'Sí. Datalyzer se integra con balanzas Mettler-Toledo, Ohaus, Sartorius y A&D para recibir datos de peso en tiempo real, aplicar cartas de control SPC y detectar desvíos de contenido neto antes de que salgan de línea. Esencial para cumplir con la legislación de contenido neto en Argentina, Colombia, Chile, Perú y toda la región.'
        },
        {
          q: '¿Datalyzer ayuda a exportar alimentos a mercados internacionales desde LATAM?',
          a: 'Sí. El cumplimiento documental automático de ISO 22000, FSSC 22000, BRC e IFS que genera Datalyzer es requisito para proveer a cadenas internacionales y habilitar exportaciones desde Argentina, Colombia, Chile, Perú y Ecuador hacia Europa, EEUU y Asia. Plantas usuarias reportan un aumento del 45% en capacidad exportadora.'
        },
        {
          q: '¿Cómo controla Datalyzer procesos de bebidas (pH, Brix, temperatura) en LATAM?',
          a: 'Datalyzer recibe mediciones de refractómetros (Brix), pHmetros, termómetros y viscosímetros vía OPC-UA, MQTT o RS-232 y aplica cartas de control en tiempo real. Crítico para productores de jugos, cervezas, gaseosas y aguas saborizadas en Argentina, Colombia, Chile, Ecuador y toda América Latina.'
        }
      ])
    ];
  }

  function schemaQuimicos() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Industria Química', url: BASE + '/quimicos' }
      ]),
      faq([
        {
          q: '¿Qué software SPC se usa en la industria química de Argentina, Colombia, Chile y LATAM?',
          a: 'Datalyzer es usado en la industria química de Argentina, Colombia, Chile, Perú, Ecuador, Uruguay y toda América Latina para controlar viscosidad, pH, densidad, punto de inflamación y exactitud de fórmulas ±0.5%. Compatible con REACH, GHS e ISO 9001, con soporte en español para toda la región.'
        },
        {
          q: '¿Cómo controlo viscosidad y pH con SPC en tiempo real en una planta química de LATAM?',
          a: 'Datalyzer recibe datos de viscosímetros (Brookfield, Anton Paar), pHmetros y otros instrumentos vía OPC-UA, MQTT o RS-232 y aplica cartas de control en tiempo real. Las alertas se disparan automáticamente cuando los valores se acercan a los límites, reduciendo el tiempo de análisis de 2 días a 30 minutos. Disponible en Argentina, Colombia, Chile, Perú, Ecuador y toda LATAM.'
        },
        {
          q: '¿Cómo ayuda Datalyzer a cumplir con REACH y GHS en la industria química LATAM?',
          a: 'Datalyzer genera trazabilidad completa de ingredientes, lotes y procesos requerida por REACH y GHS, con historial inmutable de fórmulas y resultados. Ideal para empresas químicas de Argentina, Colombia, Chile y Perú que exportan a la UE y necesitan cumplimiento REACH.'
        },
        {
          q: '¿Datalyzer es una alternativa a Minitab para la industria química en LATAM?',
          a: 'Para plantas químicas latinoamericanas con producción continua o batch, Datalyzer supera a Minitab porque opera en tiempo real integrado a instrumentos de proceso y laboratorio, en lugar de requerir análisis off-line. El módulo MSA también valida los sistemas de medición del laboratorio químico en Argentina, Colombia, Chile y toda la región.'
        },
        {
          q: '¿Cómo reduce Datalyzer los lotes rechazados en la industria química de LATAM?',
          a: 'Al aplicar SPC en tiempo real a parámetros de fórmula y proceso, Datalyzer detecta derivas antes de que el lote quede fuera de especificación. Plantas químicas en Argentina, Colombia y Chile reportan reducción de lotes rechazados de 8 a 1 por mes, con ahorro de hasta $80.000 USD/mes.'
        }
      ])
    ];
  }

  function schemaFarmaceutica() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Farmacéutica', url: BASE + '/farmaceutica' }
      ]),
      faq([
        {
          q: '¿Qué software SPC cumple con FDA 21 CFR Part 11, ANMAT, INVIMA, ISP y DIGEMID en LATAM?',
          a: 'Datalyzer cumple con FDA 21 CFR Part 11, con firma electrónica, historial de auditoría inmutable y control de acceso por roles. Es validable para cumplimiento de ANMAT (Argentina), INVIMA (Colombia), ISP (Chile), DIGEMID (Perú), ARCSA (Ecuador) y EMA (Europa). El software SPC farmacéutico más usado en toda América Latina hispanohablante para GMP y Continued Process Verification (CPV).'
        },
        {
          q: '¿Cómo prepara Datalyzer las auditorías ANMAT, INVIMA e ISP en laboratorios farmacéuticos LATAM?',
          a: 'Datalyzer genera automáticamente todos los registros GMP requeridos por ANMAT (Argentina), INVIMA (Colombia), ISP (Chile), DIGEMID (Perú) y ARCSA (Ecuador): trazabilidad de lotes, desviaciones documentadas, acciones correctivas y reportes de tendencia. Una inspección regulatoria que antes requería semanas se reduce a horas.'
        },
        {
          q: '¿Datalyzer es válido para Continued Process Verification (CPV) FDA en LATAM?',
          a: 'Sí. Datalyzer genera índices de capacidad, cartas de control e informes estadísticos requeridos por FDA 21 CFR Part 211 e ICH Q10 para la etapa 3 de validación de procesos farmacéuticos. Válido para laboratorios farmacéuticos en Argentina, Colombia, Chile, Perú, Ecuador, Uruguay y toda América Latina hispanohablante.'
        },
        {
          q: '¿Es Datalyzer una alternativa a Minitab para la industria farmacéutica en LATAM?',
          a: 'Para laboratorios farmacéuticos y plantas de producción en América Latina, Datalyzer supera a Minitab en: cumplimiento FDA 21 CFR Part 11 (Minitab no es validable para electronic records), integración con equipos de producción en tiempo real, soporte local en español, y conocimiento de las regulaciones INVIMA, ISP, DIGEMID y ANMAT de cada país.'
        },
        {
          q: '¿Qué es el Gage R&R y cómo lo hace Datalyzer en farma para LATAM?',
          a: 'El Gage R&R valida el sistema de medición requerido por FDA, ICH Q2, INVIMA e ISO 9001. Datalyzer ejecuta estudios Gage R&R cruzados y anidados, calcula %R&R y número de categorías distintas (ndc), y genera el informe completo para auditorías ANMAT (Argentina), INVIMA (Colombia) e ISP (Chile).'
        }
      ])
    ];
  }

  function schemaAseo() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Aseo & Cosmética', url: BASE + '/aseo' }
      ]),
      faq([
        {
          q: '¿Qué software de calidad se usa para cosméticos en Argentina, Colombia, Chile y LATAM?',
          a: 'Datalyzer es usado por fabricantes de cosméticos y productos de higiene personal en Argentina, Colombia, Chile, Perú, Ecuador, Uruguay y toda América Latina para controlar color (L*a*b*, ΔE), viscosidad, pH y temperatura de proceso. Cumple con ISO 22716 (GMP cosmética), BPM ANMAT (Argentina), INVIMA (Colombia), ISP (Chile) y las regulaciones de cada país LATAM.'
        },
        {
          q: '¿Cómo controla Datalyzer la consistencia de color entre lotes de cosméticos en LATAM?',
          a: 'Datalyzer recibe mediciones de colorímetros y espectrofotómetros (Konica Minolta, X-Rite, Datacolor) y aplica cartas de control sobre los valores L*, a*, b* y ΔE, asegurando consistencia de color dentro de tolerancias. Disponible para fabricantes de cosméticos en Argentina, Colombia, Chile, Ecuador, Perú y toda la región.'
        },
        {
          q: '¿Datalyzer ayuda a reducir devoluciones de cosméticos en América Latina?',
          a: 'Sí. Al detectar variaciones de viscosidad, color o pH antes del empaque final, Datalyzer previene el despacho de productos fuera de especificación. Fabricantes de cosméticos en Argentina, Colombia y Chile reportan reducciones de devoluciones de hasta el 90% y mejora del CSAT del 92%.'
        },
        {
          q: '¿Datalyzer cumple con ISO 22716, BPM ANMAT e INVIMA para cosméticos en LATAM?',
          a: 'Sí. Datalyzer genera todos los registros de producción y control de calidad requeridos por ISO 22716 y las BPM de cosméticos de ANMAT (Argentina), INVIMA (Colombia), ISP (Chile), DIGEMID (Perú) y ARCSA (Ecuador): trazabilidad de materias primas, registros de proceso lote a lote y controles de producto terminado.'
        }
      ])
    ];
  }

  function schemaManufactura() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Manufactura Industrial', url: BASE + '/manufactura' }
      ]),
      faq([
        {
          q: '¿Qué software SPC se usa para certificar IATF 16949 en Argentina, Colombia, Chile y LATAM?',
          a: 'Datalyzer es el software SPC de referencia para certificaciones IATF 16949 en la industria automotriz y manufactura de precisión en Argentina, Colombia, Chile, Perú, Ecuador, Uruguay y toda América Latina hispanohablante. Incluye los cinco Core Tools AIAG/VDA: APQP, PFMEA, Control Plan, MSA y SPC integrados en una sola plataforma con soporte en español.'
        },
        {
          q: '¿Cómo ayuda Datalyzer a implementar FMEA para IATF 16949 en LATAM?',
          a: 'El módulo FMEA de Datalyzer implementa la metodología AIAG-VDA (1ª edición 2019), calculando Severity, Occurrence y Detection automáticamente, gestionando acciones preventivas y correctivas, y vinculando el PFMEA directamente al Control Plan y las cartas SPC de producción. Disponible para manufactura en Argentina, Colombia, Chile, Perú, Ecuador y toda LATAM.'
        },
        {
          q: '¿Es Datalyzer una alternativa a WinSPC o InfinityQS para manufactura en LATAM?',
          a: 'Datalyzer supera a WinSPC (DataNet Quality Systems) e InfinityQS en América Latina por: soporte local en español, módulos FMEA y APQP integrados (que WinSPC no tiene), precios adaptados al mercado latinoamericano, y representación oficial con implementación guiada en Argentina, Colombia, Chile, Perú y toda la región.'
        },
        {
          q: '¿Cómo mejora el OEE con Datalyzer en plantas de manufactura de LATAM?',
          a: 'Datalyzer monitorea los parámetros de proceso que afectan la calidad del OEE en tiempo real, detectando causas de variabilidad antes de que generen defectos o scrap. Plantas de manufactura en Argentina, Colombia y Chile reportan mejoras del 15-20% en OEE y reducción de defectos de 1% a 0.01%.'
        },
        {
          q: '¿Qué diferencia hay entre Datalyzer y PQ Systems (CHARTrunner/SQCpack) para manufactura en LATAM?',
          a: 'Datalyzer supera a PQ Systems CHARTrunner y SQCpack en América Latina en: integración industrial nativa (OPC-UA, MQTT, SCADA), módulos FMEA/APQP integrados, soporte oficial en español para Argentina, Colombia, Chile, Perú, Ecuador y toda LATAM, y capacidades de análisis multivariable. PQ Systems es un software más básico sin integración industrial avanzada ni presencia local en la región.'
        }
      ])
    ];
  }

  function schemaEmpaque() {
    return [
      breadcrumb([
        { name: 'Inicio', url: BASE },
        { name: 'Empaque', url: BASE + '/empaque' }
      ]),
      faq([
        {
          q: '¿Qué software SPC controla la calidad de empaque flexible en Argentina, Colombia, Chile y LATAM?',
          a: 'Datalyzer controla grosor de película, resistencia al sellado, hermeticidad, leak test y fuerza de desprendimiento en líneas de empaque flexible en Argentina, Colombia, Chile, Perú, Ecuador, Uruguay, Paraguay y toda América Latina. Se integra con medidores de grosor en línea y equipos de leak test, cumpliendo ISO 10149 y estándares ASTM.'
        },
        {
          q: '¿Cómo reduce Datalyzer la merma de material de empaque en LATAM?',
          a: 'Al aplicar SPC al grosor de película y parámetros de sellado, Datalyzer detecta derivas del extrusor o selladora antes de que generen material fuera de especificación. Plantas de empaque en Argentina, Colombia y Chile reducen la merma de hasta 4% a 0.3%, ahorrando $150.000 USD/año en materias primas.'
        },
        {
          q: '¿Datalyzer cumple con ISO 10149 para control de empaque en América Latina?',
          a: 'Sí. Datalyzer soporta ISO 10149 y estándares ASTM para empaque farmacéutico y alimentario en Argentina, Colombia, Chile, Perú, Ecuador y toda LATAM, generando los registros de trazabilidad requeridos para auditorías ANMAT, INVIMA, ISP y FDA.'
        },
        {
          q: '¿Cómo controla Datalyzer el grosor de película plástica en tiempo real en LATAM?',
          a: 'Datalyzer recibe datos de medidores de grosor en línea (beta, infrarrojo, capacitivo) vía OPC-UA o señal analógica/digital, aplica cartas de control X̄-R y detecta variaciones del perfil de grosor. Disponible para plantas de empaque en Argentina, Colombia, Chile, Perú, Ecuador y toda América Latina hispanohablante.'
        }
      ])
    ];
  }

  /* ── Helpers ─────────────────────────────────────────── */
  function breadcrumb(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map(function (item, i) {
        return { '@type': 'ListItem', position: i + 1, name: item.name, item: item.url };
      })
    };
  }

  function faq(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(function (item) {
        return {
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        };
      })
    };
  }

  function inject(schema) {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema, null, 0);
    document.head.appendChild(el);
  }
})();
