/**
 * author: KCFE
 * date: 2018/01/08
 * description: 内容为Tab形式的字段组
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField';
import FieldConverter from '../FieldConverter';
import Button from '../common/Button';
import Collapse, { Panel } from 'rc-collapse';
import Select, { Option } from 'rc-select';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';


class TabFieldset extends React.Component{
    constructor(props){
        super(props);
        let length = props.length;
        if(Array.isArray(props.length)){
            length = props.length[0];
        }
        if(Array.isArray(props.value)){
            length = props.value.length;
        }
        this.state = {
            length,
            activePanelKey: '0',
            activeTabKey: '1',
            value: props.value || []
        };
        // 字段组关联的字段实例
        this.refFields = [];
    }

    validate = () => {
        let resValid = true;
        let errorTabIndex = -1;
        for(let i = 0; i < this.state.length; i++){
            const tabFields = this.refFields[i];
            let tabValid = Object.keys(tabFields).reduce((suc, key) => {
                const valid = tabFields[key].validate();
                return suc && valid;
            }, true);
            if(errorTabIndex === -1 && !tabValid){
                errorTabIndex = i;
            }
            resValid = resValid && tabValid;
        }
        if(!resValid){
            const value = this.getValue();
            this.setState({
                activePanelKey: '0',
                activeTabKey: (errorTabIndex + 1) + '',
                value,
            });
        }
        return resValid;
    };

    getValue = () => {
        const fieldsetValue = [];
        for(let i = 0; i < this.state.length; i++){
            const tabFields = this.refFields[i];
            const tabValue = {};
            Object.keys(tabFields).forEach((key) => {
                const value = tabFields[key].getValue();
                Object.assign(tabValue, {[key]: value});
            });
            fieldsetValue.push(tabValue);
        }
        return fieldsetValue;
    };

    handleNumChange = (num) => {
        const value = this.getValue();
        this.setState({
            length: num,
            activeTabKey: '1',
            value,
        });
    };

    handleTabChange = (activeKey) => {
        const value = this.getValue();
        this.setState({
            activeTabKey: activeKey,
            value,
        });
    };

    renderSelectField = () => {
        let selectField = null;
        if(Array.isArray(this.props.length)){
            const options = this.props.length.map((num, index) => {
                return (
                    <Option key={index} value={num}>{num}</Option>
                );
            });
            selectField = (
                <FormField
                    label={this.props.numLabel}
                    value={this.state.length + ''}
                    onChange={this.handleNumChange}
                >
                    <Select style={{ width: 100 }}>
                        {options}
                    </Select>
                </FormField>
            );
        }
        return selectField;
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
        this.setState({activePanelKey: key, value});
    };

    renderSubmit = () => {
        return (
            <div className="form-item">
                <div className="item-con" style={{marginLeft: this.props.labelWidth + 10}}>
                    <Button onClick={this.handleSubmit}>
            保存
                    </Button>
                </div>
            </div>
        );
    };

    render(){
        const props = this.props;
        const fieldsetValue = this.state.value;
        // 所选tab 个数在数组中的下标
        let tabNumIndex = 0;
        if(Array.isArray(props.length)){
            tabNumIndex = props.length.indexOf(this.state.length);
        }
        let tabPanels = [];
        for(let i = 0; i < this.state.length; i++){
            const tabValue = fieldsetValue[i] || {};
            const tabFields = this.props.fields.map((item) => {
                const fieldProps = {...item};
                if(item.rules && (item.rules.maxBytes || item.rules.minBytes)){
                    const rules = {...item.rules};
                    if(Array.isArray(rules.maxBytes)){
                        rules.maxBytes = rules.maxBytes[tabNumIndex];
                    }
                    if(Array.isArray(rules.minBytes)){
                        rules.minBytes = rules.minBytes[tabNumIndex];
                    }
                    fieldProps.rules = rules;
                }

                return (
                    <FieldConverter
                        context={props.context}
                        labelWidth={props.labelWidth}
                        {...fieldProps}
                        key={`tab${i + 1}-${item.name}`}
                        value={tabValue[item.name]}
                        fieldRef={(field) => {
                            if(!this.refFields[i]){
                                this.refFields[i] = {};
                            }
                            this.refFields[i][item.name] = field;
                        }}
                    />
                );
            });
            tabPanels.push(
                <TabPane key={i + 1} tab={`Tab ${i + 1}`} style={{padding: '10px 0', maxHeight: '500px'}} forceRender>
                    {tabFields}
                </TabPane>
            );
        }

        const fieldset = (
            <div>
                {this.renderSelectField()}
                <Tabs
                    activeKey={this.state.activeTabKey}
                    onChange={this.handleTabChange}
                    renderTabBar={()=><ScrollableInkTabBar />}
                    renderTabContent={()=><TabContent animated={false} />}
                    style={{border: '2px solid #f3f3f3', margin: '10px 0 20px'}}
                >
                    {tabPanels}
                </Tabs>
                {this.props.submit && this.renderSubmit()}
            </div>
        );
        if(this.props.panelTitle){
            return (
                <Collapse activeKey={this.state.activePanelKey} onChange={this.handleCollapseChange}>
                    <Panel header={this.props.panelTitle}>
                        {fieldset}
                    </Panel>
                </Collapse>
            );
        }
        return fieldset;
    }
}

TabFieldset.propTypes = {
    // 字段组名
    name: PropTypes.string.isRequired,
    // Tab个数标签文本
    numLabel: PropTypes.string,
    // Tab内字段组的json描述
    fields: PropTypes.array,
    // Tab 个数，可固定可变动
    length: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.array.isRequired,
    ]),
    // 字段组的值
    value: PropTypes.any,
    // 折叠面板标题
    panelTitle: PropTypes.string,
    // 是否可以分段保存提交
    submit: PropTypes.bool
};

TabFieldset.defaultProps = {
    numLabel: 'Tab个数',
    labelWidth: 140,
    submit: false
};

export default TabFieldset;
