import { ConsultationFormData, STEP_KEYS } from '../types';
import { UseFormReturn } from 'react-hook-form';

export const useStepValidation = (form: UseFormReturn<ConsultationFormData>) => {
  const stepIsEdited = (index: number): boolean => {
    const stepKey = STEP_KEYS[index];
    const touched = form.formState.touchedFields[stepKey] || {};
    const dirty = form.formState.dirtyFields[stepKey] || {};
    return Object.values(touched).some(Boolean) || Object.values(dirty).some(Boolean);
  };

  const stepHasErrors = (index: number): boolean => {
    const stepKey = STEP_KEYS[index];
    return !!form.formState.errors[stepKey];
  };

  return { stepIsEdited, stepHasErrors };
};