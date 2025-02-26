import { z } from 'zod';
import { create } from 'xmlbuilder2';
import { parseStringPromise } from 'xml2js'; // You need to install this package

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, categorySchema.parse);

    // Transformation des langues en un format adapté à xmlbuilder2
    const transformLanguages = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if ('language' in obj[key] && Array.isArray(obj[key].language)) {
            // Convertir chaque "language" en un tableau de balises XML
            obj[key].language = obj[key].language.map(lang => ({
              '@id': lang.id,
              '#text': lang.text
            }));
          } else {
            transformLanguages(obj[key]); // Récursion si l'objet contient d'autres objets
          }
        }
      }
    };

    // Appliquer la transformation sur "category"
    if (body.category) {
      transformLanguages(body.category);
    }


    const prestashopApiUrl = process.env.PRESTASHOP_URL+'/api/categories';
    const apiKey = process.env.PRESTASHOP_API_KEY;

    // Convert JSON to XML using xmlbuilder2
    const xmlDoc = create({ version: '1.0', encoding: 'UTF-8' });
    const xmlData = xmlDoc.ele('prestashop').ele(body).end({ prettyPrint: true });

    console.log('Body', body);
    console.log('xmlData', xmlData);

    // console.log(response);

    const response = await fetch(prestashopApiUrl, {
      method: 'POST',
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
