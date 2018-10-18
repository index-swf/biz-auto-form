/**
 * author: KCFE
 * date: 2017/10/12
 * description: 组合结构的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import Collapse, { Panel } from 'rc-collapse';
import FieldConverter from '../FieldConverter';
import Button from '../common/Button';


class GroupFieldset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activePanelKey: '0',
            value: props.value || {}
        };
        // 字段组关联的字段实例
        this.refFields = {};
    }

    validate = () => {
        const resValid = Object.keys(this.refFields).reduce((suc, key) => {
            const valid = this.refFields[key].validate();
            return suc && valid;
        }, true);
        if(!resValid){
            const value = this.getValue();
            this.setState({
                activePanelKey: '0',
                value
            });
        }
        return resValid;
    };

    getValue = () => {
        const fieldsetValue = {};
        Object.keys(this.refFields).forEach((key) => {
            const value = this.refFields[key].getValue();
            Object.assign(fieldsetValue, { [key]: value });
        });
        return fieldsetValue;
    };

    handleSubmit = () => {
        if(!this.validate()){
            return;
        }
        if(this.props.onSubmit){
            this.props.onSubmit({
                [this.props.name]: this.getValue()
            });
        }
    };

    handleCollapseChange = (key) => {
        const value = this.getValue();
        this.setState({ activePanelKey: key, value });
    };

    renderSubmit = () => {
        return (
            <div className="form-item">
                <div className="item-con" style={{ marginLeft: this.props.labelWidth + 10 }}>
                    <Button onClick={this.handleSubmit}>
                        保存
                    </Button>
                </div>
            </div>
        );
    };

    render(){
        const fieldsetValue = this.state.value;
        const fields = this.props.fields.map((item) => {
            const { context, labelWidth } = this.props;
            return <FieldConverter
                context={context}
                labelWidth={labelWidth}
                {...item}
                key={item.name}
                value={fieldsetValue[item.name]}
                fieldRef={(field) => {
                    if(field){
                        this.refFields[item.name] = field;
                    }else{
                        delete this.refFields[item.name];
                    }
                }}
            />;
        });
        if(this.props.panelTitle){
            return (
                <Collapse activeKey={this.state.activePanelKey} onChange={this.handleCollapseChange}>
                    <Panel header={this.props.panelTitle}>
                        {fields}
                        {this.props.submit && this.renderSubmit()}
                    </Panel>
                </Collapse>
            );
        }
        return (
            <div>
                {fields}
                {this.props.submit && this.renderSubmit()}
            </div>
        );
    }
}

GroupFieldset.propTypes = {
    // 字段组名
    name: PropTypes.string.isRequired,
    // 字段组的值
    value: PropTypes.any,
    // 字段组中字段的json描述
    fields: PropTypes.array,
    // 折叠面板标题
    panelTitle: PropTypes.string,
    // 是否可以分段保存提交
    submit: PropTypes.bool
};

GroupFieldset.defaultProps = {
    labelWidth: 140,
    submit: false
};

export default GroupFieldset;
