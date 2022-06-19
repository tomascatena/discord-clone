const isArray = (value: any) => Array.isArray(value);

const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !isArray(value);
};

/**
 * @desc Recursive function that converts the given value (object, array,string, number) into a Swagger schema
 * @param values - Values to be converted to swagger response body schema
 * @param result - Partial swagger response body schema to be updated recursively
 * @returns - Swagger response body schema
 */
const iterateOverValues = (values: any, result: any) => {
  const responseBody: any = {};

  if (isObject(values)) {
    let properties = {};

    Object.keys(values)
      .map((key: string) => ({
        [key]: iterateOverValues(values[key], result),
      }))
      .forEach((item: any) => {
        properties = { ...properties, ...item };
      });

    responseBody.type = 'object';
    responseBody.properties = properties;
  }
  if (isArray(values)) {
    responseBody.type = 'array';
    responseBody.items = iterateOverValues(values[0], result);
  } else if (typeof values === 'string') {
    responseBody.type = 'string';
    responseBody.example = values;
  } else if (typeof values === 'number') {
    responseBody.type = 'number';
    responseBody.example = values;
  }

  return responseBody;
};

type GetSwaggerResponseBodySchemaParams = {
  responseBody: any;
  description?: string;
};

/**
 * @desc Get swagger schema for response body from response body example (Only valid for JSON responses!)
 * @param responseBody - Example response body
 * @returns - Swagger response body schema
 */
export const getSwaggerResponseBodySchema = ({
  description,
  responseBody,
}: GetSwaggerResponseBodySchemaParams) => {
  const responseBodySwaggerSchema = {};

  return {
    ...(description && { description }),
    content: {
      'application/json': {
        schema: {
          type: 'object',
          ...iterateOverValues(responseBody, responseBodySwaggerSchema),
        },
      },
    },
  };
};
