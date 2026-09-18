export interface DepartmentGeo {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  totalSchools: number;
  highRiskPercentage: number;
  avgDropoutRate: number;
  secretariasCount: number;
  svgX: number; // approximate projected coordinates for SVG interactive map (0-800)
  svgY: number; // approximate projected coordinates for SVG interactive map (0-900)
}

export const COLOMBIA_DEPARTMENTS: DepartmentGeo[] = [
  { id: 'ANT', code: '05', name: 'Antioquia', lat: 7.1986, lng: -75.3412, totalSchools: 4210, highRiskPercentage: 18.4, avgDropoutRate: 3.8, secretariasCount: 9, svgX: 300, svgY: 340 },
  { id: 'ATL', code: '08', name: 'Atlántico', lat: 10.6966, lng: -74.8741, totalSchools: 890, highRiskPercentage: 14.2, avgDropoutRate: 3.2, secretariasCount: 3, svgX: 340, svgY: 120 },
  { id: 'BOG', code: '11', name: 'Bogotá D.C.', lat: 4.7110, lng: -74.0721, totalSchools: 2450, highRiskPercentage: 8.5, avgDropoutRate: 2.1, secretariasCount: 1, svgX: 360, svgY: 530 },
  { id: 'BOL', code: '13', name: 'Bolívar', lat: 8.6704, lng: -74.0298, totalSchools: 1820, highRiskPercentage: 24.1, avgDropoutRate: 5.2, secretariasCount: 3, svgX: 350, svgY: 240 },
  { id: 'BOY', code: '15', name: 'Boyacá', lat: 5.4545, lng: -73.3620, totalSchools: 1980, highRiskPercentage: 9.8, avgDropoutRate: 2.4, secretariasCount: 4, svgX: 410, svgY: 480 },
  { id: 'CAL', code: '17', name: 'Caldas', lat: 5.2974, lng: -75.2505, totalSchools: 1050, highRiskPercentage: 11.2, avgDropoutRate: 2.7, secretariasCount: 2, svgX: 300, svgY: 490 },
  { id: 'CAQ', code: '18', name: 'Caquetá', lat: 0.8698, lng: -73.8419, totalSchools: 1120, highRiskPercentage: 29.5, avgDropoutRate: 6.4, secretariasCount: 2, svgX: 370, svgY: 740 },
  { id: 'CAU', code: '19', name: 'Cauca', lat: 2.4419, lng: -76.6063, totalSchools: 2680, highRiskPercentage: 27.8, avgDropoutRate: 5.9, secretariasCount: 2, svgX: 230, svgY: 660 },
  { id: 'CES', code: '20', name: 'Cesar', lat: 9.3373, lng: -73.6536, totalSchools: 1340, highRiskPercentage: 21.6, avgDropoutRate: 4.7, secretariasCount: 2, svgX: 400, svgY: 200 },
  { id: 'COR', code: '23', name: 'Córdoba', lat: 8.7479, lng: -75.8814, totalSchools: 2100, highRiskPercentage: 23.4, avgDropoutRate: 4.9, secretariasCount: 4, svgX: 270, svgY: 230 },
  { id: 'CUN', code: '25', name: 'Cundinamarca', lat: 4.8624, lng: -74.0592, totalSchools: 2890, highRiskPercentage: 10.3, avgDropoutRate: 2.5, secretariasCount: 7, svgX: 350, svgY: 520 },
  { id: 'CHO', code: '27', name: 'Chocó', lat: 5.6919, lng: -76.6583, totalSchools: 1450, highRiskPercentage: 38.6, avgDropoutRate: 7.8, secretariasCount: 2, svgX: 190, svgY: 430 },
  { id: 'HUI', code: '41', name: 'Huila', lat: 2.9273, lng: -75.2819, totalSchools: 1420, highRiskPercentage: 13.9, avgDropoutRate: 3.1, secretariasCount: 2, svgX: 300, svgY: 620 },
  { id: 'LAG', code: '44', name: 'La Guajira', lat: 11.3548, lng: -72.5205, totalSchools: 1290, highRiskPercentage: 34.2, avgDropoutRate: 7.1, secretariasCount: 4, svgX: 460, svgY: 90 },
  { id: 'MAG', code: '47', name: 'Magdalena', lat: 10.4113, lng: -74.4057, totalSchools: 1530, highRiskPercentage: 25.8, avgDropoutRate: 5.4, secretariasCount: 3, svgX: 380, svgY: 150 },
  { id: 'MET', code: '50', name: 'Meta', lat: 3.2719, lng: -73.0877, totalSchools: 1310, highRiskPercentage: 17.5, avgDropoutRate: 3.9, secretariasCount: 2, svgX: 440, svgY: 590 },
  { id: 'NAR', code: '52', name: 'Nariño', lat: 1.2891, lng: -77.3579, totalSchools: 2950, highRiskPercentage: 26.4, avgDropoutRate: 5.6, secretariasCount: 4, svgX: 180, svgY: 730 },
  { id: 'NSA', code: '54', name: 'Norte de Santander', lat: 7.9463, lng: -72.8988, totalSchools: 1840, highRiskPercentage: 22.3, avgDropoutRate: 4.8, secretariasCount: 3, svgX: 440, svgY: 330 },
  { id: 'QUI', code: '63', name: 'Quindío', lat: 4.4610, lng: -75.6674, totalSchools: 420, highRiskPercentage: 10.1, avgDropoutRate: 2.5, secretariasCount: 2, svgX: 280, svgY: 520 },
  { id: 'RIS', code: '66', name: 'Risaralda', lat: 4.9298, lng: -75.8906, totalSchools: 780, highRiskPercentage: 12.8, avgDropoutRate: 2.9, secretariasCount: 3, svgX: 270, svgY: 480 },
  { id: 'SAN', code: '68', name: 'Santander', lat: 6.6437, lng: -73.6536, totalSchools: 2310, highRiskPercentage: 13.5, avgDropoutRate: 3.0, secretariasCount: 5, svgX: 400, svgY: 390 },
  { id: 'SUC', code: '70', name: 'Sucre', lat: 9.0170, lng: -75.0728, totalSchools: 1280, highRiskPercentage: 24.8, avgDropoutRate: 5.1, secretariasCount: 2, svgX: 310, svgY: 220 },
  { id: 'TOL', code: '73', name: 'Tolima', lat: 4.0925, lng: -75.1545, totalSchools: 1760, highRiskPercentage: 15.3, avgDropoutRate: 3.4, secretariasCount: 2, svgX: 310, svgY: 550 },
  { id: 'VAL', code: '76', name: 'Valle del Cauca', lat: 3.8009, lng: -76.6413, totalSchools: 2980, highRiskPercentage: 14.9, avgDropoutRate: 3.3, secretariasCount: 8, svgX: 230, svgY: 560 },
  { id: 'ARA', code: '81', name: 'Arauca', lat: 6.5518, lng: -70.9329, totalSchools: 540, highRiskPercentage: 27.2, avgDropoutRate: 5.8, secretariasCount: 1, svgX: 550, svgY: 410 },
  { id: 'CAS', code: '85', name: 'Casanare', lat: 5.3378, lng: -71.7454, totalSchools: 690, highRiskPercentage: 16.1, avgDropoutRate: 3.7, secretariasCount: 2, svgX: 510, svgY: 500 },
  { id: 'PUT', code: '86', name: 'Putumayo', lat: 0.4389, lng: -76.5222, totalSchools: 810, highRiskPercentage: 31.4, avgDropoutRate: 6.8, secretariasCount: 1, svgX: 250, svgY: 770 },
  { id: 'AMZ', code: '91', name: 'Amazonas', lat: -1.4429, lng: -71.5724, totalSchools: 320, highRiskPercentage: 35.1, avgDropoutRate: 7.2, secretariasCount: 1, svgX: 470, svgY: 850 },
  { id: 'GUA', code: '94', name: 'Guainía', lat: 2.5855, lng: -68.5247, totalSchools: 190, highRiskPercentage: 33.7, avgDropoutRate: 6.9, secretariasCount: 1, svgX: 680, svgY: 620 },
  { id: 'GUV', code: '95', name: 'Guaviare', lat: 2.1156, lng: -72.6358, totalSchools: 270, highRiskPercentage: 28.9, avgDropoutRate: 6.2, secretariasCount: 1, svgX: 480, svgY: 670 },
  { id: 'VAU', code: '97', name: 'Vaupés', lat: 0.8554, lng: -70.8120, totalSchools: 210, highRiskPercentage: 36.4, avgDropoutRate: 7.5, secretariasCount: 1, svgX: 580, svgY: 740 },
  { id: 'VIC', code: '99', name: 'Vichada', lat: 4.4234, lng: -69.2876, totalSchools: 290, highRiskPercentage: 32.1, avgDropoutRate: 6.7, secretariasCount: 1, svgX: 650, svgY: 510 }
];
