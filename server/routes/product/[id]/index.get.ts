import { z } from 'zod';

export default defineEventHandler(async (event) => {

  try {
    const id = getRouterParam(event, 'id');
    const verifiedId = z.coerce.number().parse(id);

    const prestashopApiUrl = `${process.env.PRESTASHOP_URL}/api/products/${verifiedId}?output_format=JSON`;
    const apiKey = process.env.PRESTASHOP_API_KEY;

    const response = await fetch(prestashopApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
        'Content-Type': 'application/xml',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data: ${response.statusText}. Details: ${errorText}`);
    }

    const responseText = await response.text();
    const responseData = JSON.parse(responseText);
    return {
      success: true,
      data: responseData,
    };

  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: error.message,
    };
  }
})
