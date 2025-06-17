/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

export type TAddRecipeForm = {
  title: string;
  register: any;
  error?: string;
  name: string;
  isSubmitted: boolean;
  isDisabled?: boolean;
};

export interface AddRecipeFormTextArea extends TAddRecipeForm {
  rows: number;
}
