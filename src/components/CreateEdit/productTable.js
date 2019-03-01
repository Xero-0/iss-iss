import React from 'react'
import { Table, Input, InputNumber, Form, Button } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        // rules: [{
                                        //     required: true,
                                        //     message: `Please Input ${title}!`,
                                        // }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], editingKey: '' };
        this.columns = [
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                className: 'invoiceHide',
                width: 80,
                editable: true,
            }, {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: 240,
                editable: true,
            }, {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: 30,
                editable: true,
            }, {
                title: 'Unit Price',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                editable: true,
                width: 60
            }, {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                render: (text, record) => {
                    if (record.quantity && record.unitPrice) {
                        return `$${(record.quantity * record.unitPrice).toFixed(2)}`
                    }
                },
                width: 50
            }, {
                title: 'Operation',
                dataIndex: 'operation',
                width: 50,
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <span
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8, color: '#16a085' }}>
                                                Save
                                            </span>
                                        )}
                                    </EditableContext.Consumer>
                                    {/* <span onClick={() => this.cancel(record.key)} style={{ marginRight: 8 }}>Cancel</span> */}
                                    <span onClick={() => this.handleDelete(record.key)} style={{ color: '#2c3e50' }}>Delete</span>
                                </span>
                            ) : (
                                    <span style={{ color: '#2980b9' }} onClick={() => this.edit(record.key)}>Edit</span>
                                )}
                        </div>
                    );
                },
            },
        ];
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.data !== this.state.data) {
            this.props.edited(this.state.data)

        }
        if (prevProps.existingProducts !== this.props.existingProducts) {
            this.setState({ data: this.props.existingProducts})
            console.log(this.props.existingProducts);
            
        }
    }
    createItem() {
        this.setState({
            data: [...this.state.data, {
                key: this.state.data.length + 1,
                category: '',
                description: '',
                quantity: null,
                unitPrice: null,
            }],
            editingKey: this.state.data.length + 1
        })
    }
    handleDelete = (key) => {
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            const newData = [...this.state.data];
            const index = newData.findIndex(record => key === record.key);
            if (error || (!row.category && !row.description && !row.quantity && !row.unitPrice)) {
                this.handleDelete(newData[index].key)


                return;
            }

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: ((col.dataIndex === 'quantity') || (col.dataIndex === 'unitPrice')) ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                <h3 style={{ paddingTop: 5 }}>Products & Services</h3>
                <Table
                    components={components}
                    bordered
                    locale={{ emptyText: 'No Data' }}
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                    size='medium'
                />
                <Button type='primary' ghost style={{ marginTop: 20, width: '100%', maxWidth: 200 }} onClick={() => this.createItem()}>Add Item</Button>
            </div>
        );
    }
}
