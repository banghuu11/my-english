export function stripAccents(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // tổ hợp dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}