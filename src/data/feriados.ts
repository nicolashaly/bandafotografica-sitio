// Feriados nacionales de Chile (los regionales de Arica y Chillán no aplican en Talagante).
// Fuente: https://www.feriados.cl/ y https://www.feriados.cl/2027.php (con el respaldo legal de cada fecha, tomado
// de la BCN), revisado el 2026-11-25; feriados.gob.cl y apis.digital.gob.cl no resolvían ese día.
// Las fechas trasladables se comprobaron contra su ley: San Pedro y San Pablo y Encuentro de Dos Mundos (Ley 19.668),
// Iglesias Evangélicas (Ley 20.299), 17 de septiembre (Ley 20.983) y Pueblos Indígenas en el solsticio (Ley 21.357).
// Un feriado nuevo que se dicte por ley (interferiado, elecciones) hay que agregarlo a mano.
// shortcut: solo 2026-2027, agregar el año siguiente cada diciembre
export const feriados = [
  // 2026
  '2026-01-01', // Año Nuevo
  '2026-04-03', // Viernes Santo
  '2026-04-04', // Sábado Santo
  '2026-05-01', // Día Nacional del Trabajo
  '2026-05-21', // Glorias Navales
  '2026-06-21', // Pueblos Indígenas (solsticio)
  '2026-06-29', // San Pedro y San Pablo
  '2026-07-16', // Virgen del Carmen
  '2026-08-15', // Asunción de la Virgen
  '2026-09-18', // Independencia Nacional
  '2026-09-19', // Glorias del Ejército
  '2026-10-12', // Encuentro de Dos Mundos
  '2026-10-31', // Iglesias Evangélicas y Protestantes
  '2026-11-01', // Todos los Santos
  '2026-12-08', // Inmaculada Concepción
  '2026-12-25', // Navidad
  // 2027
  '2027-01-01', // Año Nuevo
  '2027-03-26', // Viernes Santo
  '2027-03-27', // Sábado Santo
  '2027-05-01', // Día Nacional del Trabajo
  '2027-05-21', // Glorias Navales
  '2027-06-21', // Pueblos Indígenas (solsticio)
  '2027-06-28', // San Pedro y San Pablo (29 cae martes, se traslada al lunes)
  '2027-07-16', // Virgen del Carmen
  '2027-08-15', // Asunción de la Virgen
  '2027-09-17', // Feriado adicional de Fiestas Patrias (18 cae sábado)
  '2027-09-18', // Independencia Nacional
  '2027-09-19', // Glorias del Ejército
  '2027-10-11', // Encuentro de Dos Mundos (12 cae martes, se traslada al lunes)
  '2027-10-31', // Iglesias Evangélicas y Protestantes
  '2027-11-01', // Todos los Santos
  '2027-12-08', // Inmaculada Concepción
  '2027-12-25', // Navidad
];
