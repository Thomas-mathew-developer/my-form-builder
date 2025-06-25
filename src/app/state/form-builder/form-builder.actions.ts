import { createAction, props } from '@ngrx/store';
import { FormField } from '../../shared/models/form-field.model';

export const addField = createAction(
    '[Form Builder] Add Field',
    props<{ field: FormField }>()
);

export const deleteField = createAction(
    '[Form Builder] Delete Field',
    props<{ fieldId: string }>()
);

export const selectField = createAction(
    '[Form Builder] Select Field',
    props<{ fieldId: string | null }>()
);

export const clearFields = createAction('[Form Builder] Clear Fields');
