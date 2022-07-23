import React, {useState} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap"
import {Table, Space} from "antd";
import moment from 'moment';
import {connect} from "react-redux"
import DatePicker from "react-datepicker";
import {Radio} from "antd";
import {createAction, DeleteAction, EditAction} from "../../redux/action/UserAction";
import "react-datepicker/dist/react-datepicker.css";
import "./UserEntery.css";

const UserEntry = (props) => {

    const {editUserData, deleteData, createUserData, UserData} = props;
    const initialState = {
        userName: '',
        gender: '',
        hobby: [],
        age: 0,
        date: new Date(),
        taskName: "",
        status: ""
    };

    const [data, setData] = useState(initialState);
    const [errors, setValidation] = React.useState({});

    const validation = (name, value) => {
        switch (name) {
            case 'userName':
                if (!value || !(/^[a-z A-Z]*$/g).test(value) || value.length > 15) {
                    return 'userName is Required, maximum 15 and Enter only Alphabets';
                } else {
                    return '';
                }
            case 'gender':
                if (!value) {
                    return 'Gender is Required';
                } else {
                    return ''
                }
            case 'hobby':
                if (value.length < 1) {
                    return 'Please Select Any one Hobby';
                } else {
                    return ''
                }
            case 'age':
                if (!value) {
                    return 'Age is Required';
                } else {
                    return ''
                }
            case 'date':
                if (!value) {
                    return 'Date is Required';
                } else {
                    return ''
                }
            case 'taskName':
                if (!value) {
                    return 'TaskName is Required';
                } else {
                    return ''
                }
            case 'status':
                if (!value) {
                    return 'Please Select Status';
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const onChange = (e) => {
        const {name, value} = e.target;
        if (name === "hobby") {
            let value = data.hobby || [];
            if (e.target.checked) {
                value.push(e.target.value);
            } else {
                value = data.hobby.filter((item) => item !== e.target.value);
            }
            setData((preState) => ({
                ...preState,
                hobby: value,
            }));
        } else {
            setData({
                ...data,
                [name]: value
            })
        }
    };

    const HandleSubmit = async (e) => {

        let allErrors = {};

        const userData = {
            userName: data.userName,
            gender: data.gender,
            hobby: data.hobby,
            age: data.age,
            date: data.date,
            taskName: data.taskName,
            status: data.status
        };

        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key]);
            if (error && error.length) {
                allErrors[key] = error
            }
        });

        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            e.preventDefault();
            if (data?._id) {
                await editUserData(data)
            } else {
                await createUserData(data);
            }
            setData(initialState);
            setValidation({})
        }
    };

    const HandleDelete = (data) => {
        if (window.confirm('Are you sure you want to Delete Record')) {
            deleteData(data);
        }
    };

    const entriesDashboardColumns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'hobby',
            dataIndex: 'hobby',
            render: (text, record, index) => (
                <div>
                    {record.hobby.toString()}
                </div>
            )
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'date',
            render: (text, record, index) => (
                <div>
                    {moment(record.date).format('MM/DD/YYYY')}
                </div>
            )
        },
        {
            title: 'taskName',
            dataIndex: 'taskName',
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button style={{color: "white", background: "green"}} onClick={() => setData(record)}>Edit </Button>
                    <Button style={{color: "white", background: "red"}}
                            onClick={() => HandleDelete(record)}>Delete</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div className="login">
                <div className="w-100 p-3 h-100 d-flex flex-column loginform">
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="userName" value={data.userName}
                                      type="text" placeholder="Enter name"/>
                        {errors?.userName && <Form.Text className="text-danger">
                            {errors.userName}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Label>Gender</Form.Label>
                    <Row>
                        <Col>
                            <Radio.Group
                                onChange={e => onChange({target: {name: "gender", value: e.target.value}})}
                                value={data.gender}>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    {errors?.gender && <Form.Text className="text-danger">
                        {errors.gender}
                    </Form.Text>}

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Hobby</Form.Label>
                        <Row>
                            <Col>
                                <Form.Check onChange={(e) => onChange(e)} name='hobby' value="sports"
                                            checked={data.hobby.includes("sports")}
                                            type="checkbox" label="Sports"/>
                            </Col>
                            <Col>
                                <Form.Check onChange={(e) => onChange(e)} name='hobby' value="reading"
                                            checked={data.hobby.includes("reading")}
                                            type="checkbox" label="Reading"/>
                            </Col>
                            <Col>
                                <Form.Check onChange={(e) => onChange(e)} name='hobby' value="music"
                                            checked={data.hobby.includes("music")}
                                            type="checkbox" label="Music"/>
                            </Col>
                        </Row>
                        {errors?.hobby && <Form.Text className="text-danger">
                            {errors.hobby}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="age" value={data.age} type="number"
                                      placeholder="Enter Your Age"/>
                        {errors?.age && <Form.Text className="text-danger">
                            {errors.age}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <DatePicker selected={data.date}
                                    onChange={(date) => onChange({target: {name: "date", value: date}})}/>
                        {errors?.date && <Form.Text className="text-danger">
                            {errors.date}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="taskName" value={data.taskName}
                                      type="text" placeholder="Enter Task Name"/>
                        {errors?.taskName && <Form.Text className="text-danger">
                            {errors.taskName}
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <div>
                            <select onChange={(e) => onChange(e)} name="status" value={data.status}
                                    aria-label="Status">
                                <option>select status</option>
                                <option value="active">Active</option>
                                <option value="inActive">InActive</option>
                            </select>
                        </div>
                        {errors?.status && <Form.Text className="text-danger">
                            {errors.status}
                        </Form.Text>}
                    </Form.Group>

                    <Button variant="primary" type="submit"
                            onClick={(e) => HandleSubmit(e)}>
                        Submit
                    </Button>
                </div>
            </div>
            <div>
                <Table
                    columns={entriesDashboardColumns}
                    dataSource={UserData?.userData || []}
                />
            </div>
        </div>
    )
};

const mapStateToProps = (store) => {
    return {
        UserData: store.UserData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUserData: (data) => dispatch(createAction(data)),
        editUserData: (data) => dispatch(EditAction(data)),
        deleteData: (data) => dispatch(DeleteAction(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEntry)
