export class inspectionLists {
  static yearList: number[] = Array.from({ length: 17 }, (v, k) => k + 2024);
  static ratingComponentOptions = [
    { value: 0, label: '0. Sin daño, o con daño insignificante.' },
    { value: 1, label: '1. Daño pequeño pero reparación no es necesaria (excepto mantenimiento rutinario).' },
    { value: 2, label: '2. Algún daño, reparación necesaria cuando se presente la ocasión.' },
    { value: 3, label: '3. Daño significativo, reparación necesaria muy pronto.' },
    { value: 4, label: '4. Daño grave, reparación necesaria inmediatamente.' },
    { value: 5, label: '5. Daño extremo, falla total o riesgo de falla total del componente.' },
  ];

  static damageTypeComponentOptions = [
    { value: 10, label: '10. Daño estructural (Sobrecarga / diseño insuficiente)' },
    { value: 15, label: '15. Vibración excesiva' },
    { value: 20, label: '20. Impacto' },
    { value: 30, label: '30. Asentamiento / Movimiento' },
    { value: 40, label: '40. Erosión / socavación' },
    { value: 45, label: '45. Sedimentación' },
    { value: 50, label: '50. Corrosión de acero estructural' },
    { value: 60, label: '60. Daño en concreto/ Corrosión de reforzamiento' },
    { value: 65, label: '65. Daño en concreto/ Acero Expuesto' },
    { value: 70, label: '70. Descomposición' },
    { value: 80, label: '80. Infiltración' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No Aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No Registrado' },
  ];

}
