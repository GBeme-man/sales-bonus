/**
 * Функция для расчета прибыли
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
  // @TODO: Расчет прибыли от операции
    const priceAfterDiscount = purchase.sale_price * (1 - purchase.discount / 100);
    return priceAfterDiscount * purchase.quantity;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
  const { profit } = seller;
  // @TODO: Расчет бонуса от позиции в рейтинге
  if (index === 0) {
    return seller.profit * 0.15; // Первое место — 15%
  } 
  else if (index < 3) {
    return seller.profit * 0.10; // Второе и третье — 10%
  } 
  else if (index < total - 1) {
    return seller.profit * 0.05; // Остальные, кроме последнего — 5%
  } 
  else {
    return 0; // Последнее место — 0%
  }
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
  const { calculateSimpleRevenue, calculateBonusByProfit } = options;
  // @TODO: Проверка входных данных
  if (!data ||
    !Array.isArray(data.sellers) || data.sellers.length === 0 ||
    !Array.isArray(data.products) || data.products.length === 0 ||
    !Array.isArray(data.purchase_records) || data.purchase_records.length === 0) {
    throw new Error('Некорректные входные данные')
    }
  // @TODO: Проверка наличия опций
  if (typeof calculateSimpleRevenue !== 'function' || typeof calculateBonusByProfit !== 'function') {
    throw new Error('Необходимые функции расчёта отсутствуют');
  }
  // @TODO: Подготовка промежуточных данных для сбора статистики
  const sellerStats = data.sellers.map(seller => ({
    seller_id: seller.id,
    name: `${seller.first_name} ${seller.last_name}`,
    revenue: 0,
    profit: 0,
    sales_count: 0,
    products_sold: {} // Для подсчёта топ-продуктов
  }));
  // @TODO: Индексация продавцов и товаров для быстрого доступа
  const productIndex = Object.fromEntries(
    data.products.map(product => [product.sku, product])
  );

  const sellerIndex = Object.fromEntries(
    sellerStats.map(seller => [seller.seller_id, seller])
  );
  
  // @TODO: Расчет выручки и прибыли для каждого продавца
  // @TODO: Сортировка продавцов по прибыли
  // @TODO: Назначение премий на основе ранжирования
  // @TODO: Подготовка итоговой коллекции с нужными полями
}
