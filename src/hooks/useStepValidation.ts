import { ConsultationFormData, STEP_KEYS } from '../types';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export const useStepValidation = <TFieldValues extends FieldValues = ConsultationFormData>(
  form: UseFormReturn<TFieldValues>
) => {
  const stepIsEdited = (index: number): boolean => {
    const stepKey = STEP_KEYS[index];
    const touched = (form.formState.touchedFields as Record<keyof TFieldValues, boolean>)[stepKey] || {};
    const dirty = (form.formState.dirtyFields as Record<keyof TFieldValues, boolean>)[stepKey] || {};
    return Object.values(touched).some(Boolean) || Object.values(dirty).some(Boolean);
  };

  const stepHasErrors = (index: number): boolean => {
    const stepKey = STEP_KEYS[index];
    return !!form.formState.errors[stepKey];
  };

  return { stepIsEdited, stepHasErrors };
};