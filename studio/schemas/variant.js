export default {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  fields: [
    {
      name: 'variantTitle',
      title: 'Variant Title',
      type: 'string'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      hidden: false
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'number',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      hidden: false
    },
    {
      name: 'variantId',
      title: 'Variant ID',
      type: 'number',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      hidden: false
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true
    },
    {
      name: 'productDescription',
      title: 'Product Description',
      type: 'blockContent'
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
