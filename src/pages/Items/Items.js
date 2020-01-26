import React from 'react'
import { Card,CardMedia,CardContent,CardActions,Typography,Button,CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styles from './Items.module.css'
import { connect } from "react-redux"
import { deleteItem, fetchData } from "../../redux/actions/ItemsActions"
import PropTypes from 'prop-types'

class Items extends React.Component{
    componentDidMount(){
        this.props.fetchData()
    }

    deleteItemHandler = id => {
        const answer = window.confirm('Delete this item?')

        if(answer){
            this.props.deleteItem(id)
        }
    }

    render(){
        return(
            this.props.loading
            ?
                <CircularProgress/>
            :
                this.props.items
                ?
                    Object.keys(this.props.items).map( (key, index) => {
                        const item = this.props.items[key]

                        return (
                            <Card
                                key={index}
                                className={styles.card}
                            >
                                <CardContent>
                                    <Typography
                                        variant={'h3'}
                                        gutterBottom={true}
                                        className={styles.title}
                                        align={'center'}
                                    >
                                        {item.name}
                                    </Typography>
                                    <CardMedia
                                        component={'img'}
                                        image={item.image_url}
                                        title={item.name}
                                    />
                                    <Typography
                                        variant={'body1'}
                                        align={'center'}
                                        gutterBottom={true}
                                    >
                                        {item.price} $
                                    </Typography>
                                    <Typography
                                        variant={'body1'}
                                        align={'center'}
                                        gutterBottom={true}
                                    >
                                        {item.date}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    className={styles.actions}
                                >
                                    <Link
                                        to={`/details/${key}`}
                                    >
                                        <Button
                                            variant={'contained'}
                                            color={'primary'}
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                    <Link to={`/change-image/${key}`}>
                                        <Button
                                            variant={'contained'}
                                            color={'primary'}
                                            className={styles.success}
                                        >
                                            Set image
                                        </Button>
                                    </Link>
                                    <Button
                                        variant={'contained'}
                                        color={'secondary'}
                                         onClick={() => this.deleteItemHandler(key)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })
                :
                    <Typography
                        variant={'body2'}
                        component={'h3'}
                    >
                        No data found
                    </Typography>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading : state.items.loading,
        items : state.items.items
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchData : () => dispatch(fetchData()),
        deleteItem : id => dispatch(deleteItem(id))
    }
}

Items.propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.object,
    fetchData : PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)