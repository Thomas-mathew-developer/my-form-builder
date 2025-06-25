import { createReducer, on } from '@ngrx/store';
import * as FormBuilderActions from './form-builder.actions';
import { FormBuilderState } from '../../shared/models/form-field.model';
// import { FormBuilderState } from './form-builder.state';

export const initialState: FormBuilderState = {
    fields: [],
    selectedFieldId: null
};

export const formBuilderReducer = createReducer(
    initialState,
    on(FormBuilderActions.addField, (state, { field }) => ({
        ...state,
        fields: [...state.fields, field]
    })),
    on(FormBuilderActions.deleteField, (state, { fieldId }) => ({
        ...state,
        fields: state.fields.filter(f => f.id !== fieldId)
    })),
    on(FormBuilderActions.selectField, (state, { fieldId }) => ({
        ...state,
        selectedFieldId: fieldId
    })),
    on(FormBuilderActions.clearFields, (state) => ({
        ...state,
        fields: [],
        selectedFieldId: null
    }))
);
