import { z } from 'zod';

export const productSchema = z.object({
  product: z.object({
    id: z.number().int().positive('Id must be a positive integer').optional(),
    id_manufacturer: z.number().int().positive('Id manufacturer must be a positive integer').optional(),
    id_supplier: z.number().int().positive('Id supplier must be a positive integer').optional(),
    id_category_default: z.number().int().positive('Id category default must be a positive integer').default(2),
    new: z.boolean().optional(),
    cache_default_attribute: z.number().int().positive('Cache default attribute must be a positive integer').optional(),
    id_default_image: z.number().int().positive('Id default image must be a positive integer').optional(),
    id_default_combination: z.number().int().positive('Id default combination must be a positive integer').optional(),
    id_tax_rules_group: z.number().int().positive('Id tax rules group must be a positive integer').optional(),
    position_in_category: z.number().int().positive('Position in category must be a positive integer').optional(),
    manufacturer_name: z.string().min(1, 'Manufacturer name is required').optional(),
    quantity: z.number().int().positive('Quantity must be a positive integer').optional(),
    type: z.string().min(1, 'Type is required').optional(),
    id_shop_default: z.number().int().positive('Id shop default must be a positive integer').default(1),
    reference: z.string().min(1, 'Reference is required'),
    supplier_reference: z.string().min(1, 'Location must be at least 1 characters').optional(),
    location: z.string().min(5, 'Location must be at least 5 characters').optional(),
    width: z.number().positive('Width must be a positive number').optional(),
    height: z.number().positive('Height must be a positive number').optional(),
    depth: z.number().positive('Depth must be a positive number').optional(),
    weight: z.number().positive('Weight must be a positive number').optional(),
    quantity_discount: z.boolean().optional(),
    ean13: z.string().min(1, 'Ean13 is required').optional(),
    isbn: z.string().min(1, 'Isbn is required').optional(),
    upc: z.string().min(1, 'Upc is required').optional(),
    cache_is_pack: z.boolean().optional(),
    cache_has_attachments: z.boolean().optional(),
    is_virtual: z.boolean().optional(),
    state: z.number().int().positive('State must be a positive integer').default(1),
    additional_delivery_times: z.string().min(1, 'Additional delivery times is required').optional(),
    delivery_in_stock: z.string().min(1, 'Delivery in stock is required').optional(),
    delivery_out_stock: z.string().min(1, 'Delivery out stock is required').optional(),
    on_sale: z.boolean().optional(),
    online_only: z.boolean().optional(),
    ecotax: z.number().positive('Ecotax must be a positive number').optional(),
    minimal_quantity: z.number().int().positive('Minimal quantity must be at least 1').default(1),
    low_stock_threshold: z.number().int().positive('Low stock threshold must be a positive integer').optional(),
    low_stock_alert: z.boolean().optional(),
    price: z.number().positive('Price must be a positive number'),
    wholesale_price: z.number().positive('Wholesale price must be a positive number').optional(),
    unity: z.string().min(1, 'Unity is required').optional(),
    unit_price_ratio: z.number().positive('Unit price ratio must be a positive number').optional(),
    additional_shipping_cost: z.number().positive('Additional shipping cost must be a positive number').optional(),
    customizable: z.boolean().optional(),
    text_fields: z.boolean().optional(),
    active: z.number().default(0),
    redirect_type: z.string().min(1, 'Redirect type is required').optional(),
    id_product_redirected: z.number().int().positive('Id product redirected must be a positive integer').optional(),
    available_for_order: z.number().default(1),
    available_date: z.string().min(1, 'Available date is required').optional(),
    show_condition: z.boolean().optional(),
    condition: z.string().min(1, 'Condition is required').optional(),
    show_price: z.number().optional().default(0),
    indexed: z.number().optional().default(0),
    visibility: z.string().min(1, 'Visibility is required').optional(),
    advanced_stock_management: z.boolean().optional(),
    date_add: z.string().min(1, 'Date add is required').optional(),
    date_upd: z.string().min(1, 'Date upd is required').optional(),
    pack_stock_type: z.number().int().positive('Pack stock type must be a positive integer').optional(),
    meta_description: z.string().min(1, 'Meta description is required').optional(),
    meta_keywords: z.string().min(1, 'Meta keywords is required').optional(),
    meta_title: z.string().min(1, 'Meta title is required').optional(),
    link_rewrite: z.string().min(5, 'Link rewrite must be at least 5 characters long')
      .regex(/^[a-z0-9-]+$/, {
        message: 'Link rewrite must contain only lowercase letters, numbers, and hyphens.'
      }),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required').optional(),
    description_short: z.string().min(1, 'Description short is required').optional(),
    available_now: z.string().min(1, 'Available now is required').optional(),
    available_later: z.string().min(1, 'Available later is required').optional(),
    associations: z.object({
      categories: z.object({
        category: z.array(
          z.object({
            id: z.number().int().positive('Id must be a positive integer')
          })
        )
      }).optional(),
      images: z.object({
        image: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      combinations: z.object({
        combination: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      product_option_values: z.object({
        product_option_value: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      product_features: z.object({
        product_feature: z.array(
          z.object({
            id: z.number().int().positive('Id must be a positive integer'),
            id_feature_value: z.number().int().positive('Id feature value must be a positive integer')
          })
        )
      }).optional(),
      tags: z.object({
        tag: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      stock_availables: z.object({
        stock_available: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer'),
          id_product_attribute: z.number().int().positive('Id product attribute must be a positive integer')
        }))
      }).optional(),
      attachments: z.object({
        attachment: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      accessories: z.object({
        product: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer')
        }))
      }).optional(),
      product_bundle: z.object({
        product: z.array(z.object({
          id: z.number().int().positive('Id must be a positive integer'),
          id_product_attribute: z.number().int().positive('Id product attribute must be a positive integer'),
          quantity: z.number().int().positive('Quantity must be a positive integer')
        }))
      }).optional()
    }).optional()
  })
});

export type ProductSchema = z.output<typeof productSchema>;
