import { z } from 'zod';

export const categorySchema = z.object({
  category: z.object({
    id: z.number().int().positive('Id must be a positive integer').optional(),
    id_parent: z.number().int().positive('Id parent must be a positive integer').optional(),
    level_depth: z.number().int().positive('Level depth must be a positive integer').optional(),
    nb_products_recursive: z.number().int().positive().optional(),
    active: z.number().int().positive().default(1),
    id_shop_default: z.number().int().positive('Id shop default must be a positive integer').default(1),
    is_root_category: z.number().int('Is root category is required').default(0),
    position: z.number().int().positive().optional(),
    date_add: z.string().min(1, 'Date add is required').optional(),
    date_upd: z.string().min(1, 'Date upd is required').optional(),
    name: z.object({
      language: z.array(
        z.object({
          id: z.number().int().positive().default(1),
          text: z.string().min(5, 'Name must be at least 5 characters')
        })
      )
    }),
    link_rewrite: z.object({
      language: z.array(
        z.object({
          id: z.number().int().positive().default(1),
          text: z.string().min(5, 'Link rewrite must be at least 5 characters long').regex(/^[a-z0-9-]+$/, {
            message: 'Link rewrite must contain only lowercase letters, numbers, and hyphens.'
          })
        })
      )
    }),
    // link_rewrite: z.string().min(5, 'Link rewrite must be at least 5 characters long')
    //   .regex(/^[a-z0-9-]+$/, {
    //     message: 'Link rewrite must contain only lowercase letters, numbers, and hyphens.'
    //   }),
    description: z.object({
      language: z.array(
        z.object({
          id: z.number().int().positive().default(1),
          text: z.string().min(5, 'Name must be at least 5 characters')
        })
      )
    }).optional(),
    // description: z.string().min(20, 'Description must be at least 5 characters long').optional(),
    // meta_title: z.string().min(20, 'Meta title is required, must be at least 20 characters'),
    meta_title: z.object({
      language: z.array(
        z.object({
          id: z.number().int().positive().default(1),
          text: z.string().min(20, 'Meta title is required, must be at least 20 characters')
        })
      )
    }),
    meta_description: z.object({
      language: z.array(
        z.object({
          id: z.number().int().positive().default(1),
          text: z.string().min(30, 'Meta description is required, must be at least 30 characters')
        })
      )
    }),
    // meta_description: z.string().min(30, 'Meta description is required, must be at least 30 characters'),
    meta_keywords: z.string().optional(),
    associations: z.object({
      categories: z.object({
        category: z.array(
          z.object({
            id: z.number().int().positive('Category id must be a positive integer')
          })
        )
      }).optional(),
      products: z.object({
        product: z.array(
          z.object({
            id: z.number().int().positive('Product id must be a positive integer')
          })
        )
      }).optional()
    }).optional()
  })
});


export type CategorySchema = z.output<typeof categorySchema>;
