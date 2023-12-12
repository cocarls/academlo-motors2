import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const reapirsSchema = z.object({
  date: z
    .string()
    .min(3, { message: 'date is too short' })
    .max(255, { message: 'datee is too long' }),
  description: z
    .string()
    .min(3, { message: 'description is too short' })
    .max(255, { message: 'description is too long' }),
  motorsNumber: z.number(),
});

export function validateRepairs(data) {
  const result = reapirsSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairsData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages, 
    repairsData
  }
}
