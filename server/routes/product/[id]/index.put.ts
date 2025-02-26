import { z } from 'zod';
import { create } from 'xmlbuilder2';
import { parseStringPromise } from 'xml2js'; // You need to install this package

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const parsedData = productSchema.parse(body);

    const prestashopApiUrl = process.env.PRESTASHOP_URL+'/api/product';
    const apiKey = process.env.PRESTASHOP_API_KEY;

    // Convert JSON to XML using xmlbuilder2
    const xmlDoc = create({ version: '1.0', encoding: 'UTF-8' });
    const xmlData = xmlDoc.ele('prestashop').ele(parsedData).end({ prettyPrint: true });

    console.log('Body', body);
    console.log('Parse', parsedData);
    console.log('xmlData', xmlData);
    // return 'Data sent successfully';

    const response = await fetch(prestashopApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
        'Content-Type': 'application/xml'
      },
      body: xmlData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data: ${response.statusText}. Details: ${errorText}`);
    }

    const responseText = await response.text();
    const responseData = await parseStringPromise(responseText);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }

    return {
      success: false,
      message: error.message
    };
  }
});
