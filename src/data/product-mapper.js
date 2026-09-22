/**
 * Перевод между строкой в базе (snake_case) и товаром в коде (camelCase).
 * Вынесено отдельно, потому что этим пользуются и сайт, и админка.
 */

export function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    oldPrice: row.old_price,
    tagline: row.tagline || '',
    description: row.description || '',
    emotional: row.emotional || '',
    size: row.size || '',
    composition: row.composition || '',
    image: row.image || '',
    alt: row.alt || row.name,
    category: row.category,
    badge: row.badge,
    tags: row.tags || [],
    recipient: row.recipient || [],
    occasion: row.occasion || [],
    collections: row.collections || [],
    budget: row.budget ?? row.price,
    bestseller: row.bestseller ?? false,
    seasonal: row.seasonal ?? false,
    available: row.available ?? true,
    addOns: row.add_ons ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function productToRow(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    old_price: product.oldPrice || null,
    tagline: product.tagline || '',
    description: product.description || '',
    emotional: product.emotional || '',
    size: product.size || '',
    composition: product.composition || '',
    image: product.image || '',
    alt: product.alt || product.name,
    category: product.category,
    badge: product.badge || null,
    tags: product.tags || [],
    recipient: product.recipient || [],
    occasion: product.occasion || [],
    collections: product.collections || [],
    budget: product.budget ?? product.price,
    bestseller: Boolean(product.bestseller),
    seasonal: Boolean(product.seasonal),
    available: product.available !== false,
    add_ons: product.addOns !== false,
    sort_order: product.sortOrder ?? 0,
  };
}
