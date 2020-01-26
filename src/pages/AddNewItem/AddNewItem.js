import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Form from '../../components/Form/Form'
import { FormControl, TextField, FormHelperText, Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { addItem } from "../../redux/actions/AddNewItemsActions"

const validationSchema = Yup.object().shape({
    name : Yup.string()
        .max(255, 'Least than 255 symbols')
        .required('Field can\'t be empty!'),
    price : Yup.number()
        .truncate()
        .required('Field can\'t be empty!'),
    amount : Yup.number()
        .required('Field can\'t be empty!')
})

class AddNewItem extends React.Component{

    render(){
        const date = new Date().getDate() +'-' + new Date().getMonth()+1 + '-' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        return(
            <Formik
                initialValues={{ name : '', price : '', amount : '', date : date, image_name : '', image_url : 'https://firebasestorage.googleapis.com/v0/b/react-mini-shop.appspot.com/o/images%2Fno-image-png-2.png?alt=media&token=e3619bdb-054e-43f7-ad4f-97d9192c02c0'}}
                validationSchema={validationSchema}
                onSubmit={ (values, {setSubmitting, resetForm}) => {
                    setSubmitting(true)

                    this.props.addNewItem(values)

                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur }) => {
                    return (
                        <Form
                            onSubmit={handleSubmit}
                        >
                            <FormControl
                                margin={'normal'}
                            >
                                <TextField
                                    label={'Name'}
                                    value={values.name}
                                    type={'name'}
                                    name={'name'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.name && errors.name ? <FormHelperText error>{errors.name}</FormHelperText> : null}
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <TextField
                                    label={'Price'}
                                    value={values.price}
                                    type={'number'}
                                    name={'price'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.price && errors.price ? <FormHelperText error>{errors.price}</FormHelperText> : null}
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <TextField
                                    label={'Amount'}
                                    value={values.amount}
                                    type={'number'}
                                    name={'amount'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.amount && errors.amount ? <FormHelperText error>{errors.amount}</FormHelperText> : null}
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <Button
                                    type={'submit'}
                                    color={'primary'}
                                    variant={'contained'}
                                >
                                    Add new good
                                </Button>
                            </FormControl>

                            {this.props.loading
                                ?
                                <CircularProgress/>
                                :
                                this.props.status !== ''
                                &&
                                    <FormControl
                                        margin={'normal'}
                                    >
                                        <FormHelperText>
                                            {this.props.status}
                                        </FormHelperText>
                                    </FormControl>
                            }
                        </Form>
                    )
                }}
            </Formik>
        )
    }
}

function mapStateToProps(state) {
    return{
        status : state.additem.status,
        loading : state.additem.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        addNewItem : data => dispatch(addItem(data))
    }
}

AddNewItem.propTypes = {
    status: PropTypes.string,
    loading: PropTypes.bool,
    addNewItem : PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem)