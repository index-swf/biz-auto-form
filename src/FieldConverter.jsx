import React from 'react';
import controls from './controls';
import fieldsets from './fieldsets';
import FormField from './FormField';
import { pick, omit } from './common/utils';


export const FormFieldConverter = (props) => {
  const {fieldRef, control, ...restProps} = props;
  const fieldPropKeys = ['name', 'label', 'labelWidth',
    'tips', 'required', 'rules', 'defaultValue', 'value', 'onChange'];
  const fieldProps = pick(restProps, fieldPropKeys);
  const Control = controls[control];
  const controlProps = omit(restProps, fieldPropKeys);
  //自动根据校验规则补充输入的limiter
  if(fieldProps.rules && fieldProps.rules.maxBytes){
    const controlsWithLimiter = ['Input','RedWordInput','TextArea', 'LinkTextArea'];
    if(controlsWithLimiter.indexOf(control) !== -1){
      controlProps.limiter = {
        max: fieldProps.rules.maxBytes
      };
    }
  }
  if(fieldProps.rules && fieldProps.rules.maxBytesWithFilter){
    if(['RedWordInput','LinkTextArea'].indexOf(control) !== -1){
      controlProps.limiter = {
        max: fieldProps.rules.maxBytesWithFilter
      };
    }
  }
  return (
    <FormField ref={fieldRef} {...fieldProps}>
      <Control {...controlProps} />
    </FormField>
  );
};

export const FieldsetConverter = (props) => {
  const {fieldRef, fieldset, ...fieldsetProps} = props;
  const Fieldset = fieldsets[fieldset];
  return (
    <Fieldset ref={fieldRef} {...fieldsetProps} />
  );
};

const FieldConverter = (props) => {
  if('fieldset' in props){
    return <FieldsetConverter {...props} />;
  }
  if('control' in props){
    return <FormFieldConverter {...props} />;
  }
  return <p>无效的字段配置对象</p>;
};

export default FieldConverter;
