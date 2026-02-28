export function formatGas(value: number): string {
  return value.toLocaleString();
}

export function calcSavings(evm: number, stylus: number): number {
  return Math.round(((evm - stylus) / evm) * 100);
}
