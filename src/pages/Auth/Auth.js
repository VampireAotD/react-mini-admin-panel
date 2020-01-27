import React from 'react'
import Form from '../../components/Form/Form'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormControl, TextField, FormHelperText, Button, Typography, CircularProgress} from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { auth } from "../../redux/actions/AuthActions"

const validationSchema = Yup.object().shape({
    email : Yup.string()
        .email('Must be a valid email!')
        .required('Field can\'t be empty!'),
    password : Yup.string()
        .required('Field can\'t be empty!')
})

class Auth extends React.Component{
    render(){
        return(
            <Formik
                initialValues={{ email: '', password : ''}}
                validationSchema={validationSchema}
                onSubmit={(values) => {

                    const userData = {
                        email : values.email,
                        password : values.password,
                        returnSecureToken : true
                    }

                    this.props.auth(userData)
                }}
            >
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur}) => {
                    return (
                        <Form
                            onSubmit={handleSubmit}
                        >

                            <FormControl
                                margin={'normal'}
                            >
                                <Typography
                                    variant={'body1'}
                                    component={'h1'}
                                    align={'center'}
                                >
                                    Sign In
                                </Typography>
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <TextField
                                    type={'email'}
                                    name={'email'}
                                    label={'Email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <TextField
                                    type={'password'}
                                    name={'password'}
                                    label={'Password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                            </FormControl>

                            <FormControl
                                margin={'normal'}
                            >
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                >
                                    Login
                                </Button>
                            </FormControl>

                            {this.props.loading
                                ?
                                <CircularProgress/>
                                :
                                <FormControl
                                    margin={'normal'}
                                >
                                    <FormHelperText
                                        error
                                    >
                                        {this.props.error}
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
        loading : state.auth.loading,
        error : state.auth.error
    }
}

function mapDispatchToProps(dispatch) {
    return{
        auth : userData => dispatch(auth(userData))
    }
}

Auth.propTypes = {
    auth : PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)