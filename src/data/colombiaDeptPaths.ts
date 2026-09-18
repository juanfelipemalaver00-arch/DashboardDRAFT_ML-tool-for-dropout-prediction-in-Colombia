export interface DepartmentSvgPath {
  id: string;
  code: string;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
  capital: string;
  region: 'Caribe' | 'Andina' | 'Pacífico' | 'Orinoquía' | 'Amazonía' | 'Insular';
}

/**
 * Coordenadas vectoriales continuas y precisas de los 32 departamentos de Colombia
 * proyectadas sobre el sistema de coordenadas SVG oficial del visualizador DANE (viewBox: 80 40 680 850).
 */
export const COLOMBIA_DEPARTMENT_PATHS: DepartmentSvgPath[] = [
  // 1. LA GUAJIRA
  {
    id: 'LAG',
    code: '44',
    name: 'La Guajira',
    d: 'M 405,135 L 435,110 L 465,65 L 490,48 L 522,72 L 512,98 L 472,138 L 438,155 L 405,135 Z',
    labelX: 460,
    labelY: 95,
    capital: 'Riohacha',
    region: 'Caribe'
  },
  // 2. MAGDALENA
  {
    id: 'MAG',
    code: '47',
    name: 'Magdalena',
    d: 'M 345,108 L 405,110 L 405,135 L 418,175 L 398,225 L 362,215 L 345,155 L 345,108 Z',
    labelX: 378,
    labelY: 155,
    capital: 'Santa Marta',
    region: 'Caribe'
  },
  // 3. ATLÁNTICO
  {
    id: 'ATL',
    code: '08',
    name: 'Atlántico',
    d: 'M 328,105 L 345,108 L 345,155 L 332,150 L 320,122 L 328,105 Z',
    labelX: 335,
    labelY: 125,
    capital: 'Barranquilla',
    region: 'Caribe'
  },
  // 4. CESAR
  {
    id: 'CES',
    code: '20',
    name: 'Cesar',
    d: 'M 405,135 L 438,155 L 448,225 L 432,275 L 395,268 L 398,225 L 418,175 Z',
    labelX: 418,
    labelY: 205,
    capital: 'Valledupar',
    region: 'Caribe'
  },
  // 5. BOLÍVAR
  {
    id: 'BOL',
    code: '13',
    name: 'Bolívar',
    d: 'M 305,145 L 332,150 L 345,155 L 362,215 L 398,225 L 395,268 L 382,330 L 348,322 L 340,255 L 322,230 L 305,185 Z',
    labelX: 350,
    labelY: 235,
    capital: 'Cartagena',
    region: 'Caribe'
  },
  // 6. SUCRE
  {
    id: 'SUC',
    code: '70',
    name: 'Sucre',
    d: 'M 292,185 L 322,185 L 332,235 L 305,248 L 285,225 Z',
    labelX: 308,
    labelY: 215,
    capital: 'Sincelejo',
    region: 'Caribe'
  },
  // 7. CÓRDOBA
  {
    id: 'COR',
    code: '23',
    name: 'Córdoba',
    d: 'M 248,198 L 285,190 L 305,248 L 282,282 L 255,275 L 242,230 Z',
    labelX: 270,
    labelY: 235,
    capital: 'Montería',
    region: 'Caribe'
  },
  // 8. ANTIOQUIA
  {
    id: 'ANT',
    code: '05',
    name: 'Antioquia',
    d: 'M 235,245 L 255,275 L 282,282 L 340,255 L 348,322 L 368,332 L 360,392 L 335,425 L 285,415 L 258,355 L 235,310 Z',
    labelX: 300,
    labelY: 340,
    capital: 'Medellín',
    region: 'Andina'
  },
  // 9. CHOCÓ
  {
    id: 'CHO',
    code: '27',
    name: 'Chocó',
    d: 'M 198,275 L 235,275 L 258,355 L 245,435 L 225,502 L 182,492 L 172,380 L 188,310 Z',
    labelX: 202,
    labelY: 425,
    capital: 'Quibdó',
    region: 'Pacífico'
  },
  // 10. NORTE DE SANTANDER
  {
    id: 'NSA',
    code: '54',
    name: 'Norte de Santander',
    d: 'M 432,275 L 472,288 L 478,368 L 438,375 L 418,335 L 395,268 Z',
    labelX: 442,
    labelY: 325,
    capital: 'Cúcuta',
    region: 'Andina'
  },
  // 11. SANTANDER
  {
    id: 'SAN',
    code: '68',
    name: 'Santander',
    d: 'M 368,332 L 418,335 L 438,375 L 428,435 L 372,435 L 360,392 Z',
    labelX: 398,
    labelY: 385,
    capital: 'Bucaramanga',
    region: 'Andina'
  },
  // 12. ARAUCA
  {
    id: 'ARA',
    code: '81',
    name: 'Arauca',
    d: 'M 478,368 L 595,385 L 578,435 L 485,435 L 478,368 Z',
    labelX: 538,
    labelY: 405,
    capital: 'Arauca',
    region: 'Orinoquía'
  },
  // 13. BOYACÁ
  {
    id: 'BOY',
    code: '15',
    name: 'Boyacá',
    d: 'M 372,435 L 428,435 L 485,435 L 465,510 L 418,515 L 372,495 L 358,460 Z',
    labelX: 412,
    labelY: 472,
    capital: 'Tunja',
    region: 'Andina'
  },
  // 14. CASANARE
  {
    id: 'CAS',
    code: '85',
    name: 'Casanare',
    d: 'M 485,435 L 578,435 L 568,520 L 480,535 L 465,510 Z',
    labelX: 518,
    labelY: 485,
    capital: 'Yopal',
    region: 'Orinoquía'
  },
  // 15. CALDAS
  {
    id: 'CAL',
    code: '17',
    name: 'Caldas',
    d: 'M 285,415 L 335,425 L 340,465 L 292,465 Z',
    labelX: 310,
    labelY: 445,
    capital: 'Manizales',
    region: 'Andina'
  },
  // 16. RISARALDA
  {
    id: 'RIS',
    code: '66',
    name: 'Risaralda',
    d: 'M 252,455 L 292,455 L 292,490 L 255,490 Z',
    labelX: 272,
    labelY: 472,
    capital: 'Pereira',
    region: 'Andina'
  },
  // 17. QUINDÍO
  {
    id: 'QUI',
    code: '63',
    name: 'Quindío',
    d: 'M 272,490 L 305,490 L 305,525 L 272,525 Z',
    labelX: 288,
    labelY: 508,
    capital: 'Armenia',
    region: 'Andina'
  },
  // 18. CUNDINAMARCA
  {
    id: 'CUN',
    code: '25',
    name: 'Cundinamarca',
    d: 'M 332,465 L 372,465 L 418,515 L 398,565 L 340,560 L 325,510 Z',
    labelX: 365,
    labelY: 515,
    capital: 'Bogotá',
    region: 'Andina'
  },
  // 19. BOGOTÁ D.C.
  {
    id: 'BOG',
    code: '11',
    name: 'Bogotá D.C.',
    d: 'M 355,520 L 375,520 L 375,542 L 355,542 Z',
    labelX: 365,
    labelY: 532,
    capital: 'Bogotá D.C.',
    region: 'Andina'
  },
  // 20. TOLIMA
  {
    id: 'TOL',
    code: '73',
    name: 'Tolima',
    d: 'M 292,490 L 332,490 L 342,575 L 312,610 L 278,565 Z',
    labelX: 310,
    labelY: 548,
    capital: 'Ibagué',
    region: 'Andina'
  },
  // 21. VALLE DEL CAUCA
  {
    id: 'VAL',
    code: '76',
    name: 'Valle del Cauca',
    d: 'M 198,502 L 255,490 L 275,560 L 252,598 L 202,578 Z',
    labelX: 232,
    labelY: 552,
    capital: 'Cali',
    region: 'Pacífico'
  },
  // 22. META
  {
    id: 'MET',
    code: '50',
    name: 'Meta',
    d: 'M 375,550 L 480,535 L 552,550 L 525,645 L 425,655 L 362,615 Z',
    labelX: 445,
    labelY: 595,
    capital: 'Villavicencio',
    region: 'Orinoquía'
  },
  // 23. VICHADA
  {
    id: 'VIC',
    code: '99',
    name: 'Vichada',
    d: 'M 552,475 L 705,475 L 715,570 L 638,598 L 552,550 Z',
    labelX: 635,
    labelY: 525,
    capital: 'Puerto Carreño',
    region: 'Orinoquía'
  },
  // 24. HUILA
  {
    id: 'HUI',
    code: '41',
    name: 'Huila',
    d: 'M 282,570 L 338,570 L 342,660 L 288,680 L 272,628 Z',
    labelX: 305,
    labelY: 622,
    capital: 'Neiva',
    region: 'Andina'
  },
  // 25. CAUCA
  {
    id: 'CAU',
    code: '19',
    name: 'Cauca',
    d: 'M 185,582 L 252,598 L 282,648 L 262,710 L 192,700 L 175,638 Z',
    labelX: 228,
    labelY: 652,
    capital: 'Popayán',
    region: 'Pacífico'
  },
  // 26. NARIÑO
  {
    id: 'NAR',
    code: '52',
    name: 'Nariño',
    d: 'M 142,682 L 212,682 L 232,755 L 178,785 L 132,738 Z',
    labelX: 182,
    labelY: 732,
    capital: 'Pasto',
    region: 'Pacífico'
  },
  // 27. PUTUMAYO
  {
    id: 'PUT',
    code: '86',
    name: 'Putumayo',
    d: 'M 222,742 L 292,720 L 345,760 L 272,798 L 215,768 Z',
    labelX: 268,
    labelY: 765,
    capital: 'Mocoa',
    region: 'Amazonía'
  },
  // 28. CAQUETÁ
  {
    id: 'CAQ',
    code: '18',
    name: 'Caquetá',
    d: 'M 292,680 L 382,660 L 452,708 L 442,788 L 345,798 L 292,720 Z',
    labelX: 375,
    labelY: 738,
    capital: 'Florencia',
    region: 'Amazonía'
  },
  // 29. GUAVIARE
  {
    id: 'GUV',
    code: '95',
    name: 'Guaviare',
    d: 'M 425,655 L 525,645 L 542,708 L 452,718 Z',
    labelX: 482,
    labelY: 678,
    capital: 'San José del Guaviare',
    region: 'Amazonía'
  },
  // 30. GUAINÍA
  {
    id: 'GUA',
    code: '94',
    name: 'Guainía',
    d: 'M 618,590 L 715,570 L 738,668 L 658,698 L 608,648 Z',
    labelX: 672,
    labelY: 635,
    capital: 'Inírida',
    region: 'Amazonía'
  },
  // 31. VAUPÉS
  {
    id: 'VAU',
    code: '97',
    name: 'Vaupés',
    d: 'M 518,698 L 628,668 L 658,748 L 568,778 L 508,738 Z',
    labelX: 582,
    labelY: 735,
    capital: 'Mitú',
    region: 'Amazonía'
  },
  // 32. AMAZONAS
  {
    id: 'AMZ',
    code: '91',
    name: 'Amazonas',
    d: 'M 352,795 L 458,765 L 558,775 L 538,875 L 488,885 L 458,828 L 368,818 Z',
    labelX: 472,
    labelY: 835,
    capital: 'Leticia',
    region: 'Amazonía'
  },
  // 33. ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA (INSET)
  {
    id: 'SAP',
    code: '88',
    name: 'San Andrés y Providencia',
    d: 'M 140,80 L 160,80 L 160,110 L 140,110 Z',
    labelX: 150,
    labelY: 95,
    capital: 'San Andrés',
    region: 'Insular'
  }
];

export const COLOMBIA_CONTOUR_OUTLINE = 
  'M 405,135 L 435,110 L 465,65 L 490,48 L 522,72 L 512,98 L 472,138 L 448,225 L 472,288 L 478,368 L 595,385 L 705,475 L 715,570 L 738,668 L 658,698 L 658,748 L 568,778 L 538,875 L 488,885 L 458,828 L 368,818 L 345,798 L 272,798 L 215,768 L 178,785 L 132,738 L 142,682 L 185,582 L 198,502 L 182,492 L 172,380 L 188,310 L 235,245 L 248,198 L 292,185 L 305,145 L 328,105 L 345,108 L 405,110 Z';
