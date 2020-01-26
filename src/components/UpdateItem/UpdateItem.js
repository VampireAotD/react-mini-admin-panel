import React from 'react'
import { Formik } from 'formik'
import Form from '../Form/Form'
import * as Yup from 'yup'
import { FormControl, TextField, FormHelperText, Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { fetchItem, updateItem } from "../../redux/actions/UpdateItemActions"

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

class Details extends React.Component{

    componentDidMount(){
        this.props.getItem(this.props.match.params.id)
    }

    render(){
        const date = new Date().getDate() +'-' + new Date().getMonth()+1 + '-' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        return(
            this.props.item
            ?
                <Formik
                    initialValues={{ name : this.props.item.name, amount : this.props.item.amount, price : this.props.item.price, date : date, image_name : this.props.item.image_name , image_url : this.props.item.image_url}}
                    validationSchema={validationSchema}
                    onSubmit={ (values, {setSubmitting}) => {
                        setSubmitting(true)

                        this.props.updateItem(this.props.match.params.id, values)

                        setSubmitting(false)
                    }}
                >
                    {({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting}) => {
                        return(
                            <Form
                                onSubmit={handleSubmit}
                            >
                                <FormControl
                                    margin={'normal'}
                                >
                                    <TextField
                                        type={'text'}
                                        name={'name'}
                                        label={'Name'}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                                </FormControl>

                                <FormControl
                                    margin={'normal'}
                                >
                                    <TextField
                                        type={'number'}
                                        name={'price'}
                                        label={'Price'}
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.price && errors.price && <FormHelperText>{errors.price}</FormHelperText>}
                                </FormControl>

                                <FormControl
                                    margin={'normal'}
                                >
                                    <TextField
                                        type={'number'}
                                        name={'amount'}
                                        label={'Amount'}
                                        value={values.amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.amount && errors.amount && <FormHelperText>{errors.amount}</FormHelperText>}
                                </FormControl>

                                <FormControl
                                    margin={'normal'}
                                >
                                    <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                        disabled={isSubmitting}
                                    >
                                        Update
                                    </Button>
                                </FormControl>

                                {this.props.loading
                                    ?
                                    <CircularProgress/>
                                    :
                                        this.props.status !== '' || this.props.error !== ''
                                        ?
                                            <FormHelperText>
                                                {this.props.status || this.props.error}
                                            </FormHelperText>
                                        :
                                            null
                                }
                            </Form>
                        )
                    }}
                </Formik>
            :
               <CircularProgress
                   color={'primary'}
               />
        )
    }
}

function mapStateToProps(state) {
    return{
        loading : state.update.loading,
        item : state.update.item,
        status : state.update.status,
        error : state.update.error
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getItem : id => dispatch(fetchItem(id)),
        updateItem : (id, values) => dispatch(updateItem(id, values))
    }
}

Details.propTypes = {
    loading: PropTypes.bool.isRequired,
    item : PropTypes.object,
    status: PropTypes.string,
    error: PropTypes.string,
    getItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)