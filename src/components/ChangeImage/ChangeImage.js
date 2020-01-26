import React from 'react'
import Form from '../Form/Form'
import storage from '../Firebase/Firebase'
import FileUploader from 'react-firebase-file-uploader'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'

const ref = React.createRef()

class ChangeImage extends React.Component{

    state = {
        item : null,
        loading : false
    }

    componentDidMount(){
        this.getItem()
    }

    getItem = async () => {
        try{
            const res = await axios.get(`https://react-mini-shop.firebaseio.com/items/${this.props.match.params.id}.json`)

            this.setState({
                ...this.state,
                item : res.data,
                loading : false
            })
        }
        catch (error){
            console.log(error)
        }
    }

    handleUploadSuccess = filename => {
        this.deletePreviousImage()
        storage
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(image => {
                const item = {...this.state.item}

                item.image_name = filename
                item.image_url = image

                this.setState({
                    item
                })
            })
            .then(() => {
                axios.put(`https://react-mini-shop.firebaseio.com/items/${this.props.match.params.id}.json`, this.state.item)
                    .then(() => {
                        this.getItem()
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleUploadStart = () => {
        this.setState({
            ...this.state,
            loading : true
        })
    }

    deletePreviousImage = () => {
      if(this.state.item.image_name !== ''){
          storage
              .storage()
              .ref('images')
              .child(this.state.item.image_name)
              .getDownloadURL()
              .then(url => {
                  if(url !== 'https://firebasestorage.googleapis.com/v0/b/react-mini-shop.appspot.com/o/images%2Fno-image-png-2.png?alt=media&token=e3619bdb-054e-43f7-ad4f-97d9192c02c0'){
                      storage
                          .storage()
                          .ref(`images`)
                          .child(this.state.item.image_name)
                          .delete()
                          .then(() => {
                              this.getItem()
                          })
                  }
              })
      }
    }

    render(){
        return(
            this.state.item
            ?
                <Form>
                    <FileUploader
                        accept={'image/*'}
                        name={'image'}
                        randomizeFilename
                        storageRef={storage.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadSuccess={this.handleUploadSuccess}
                        onUploadError={error => {this.setState({ ...this.state, loading: false}); console.log(error)}}
                        ref={ref}
                    />
                    {this.state.loading && <CircularProgress/>}
                </Form>
            :
                <CircularProgress/>
        )
    }
}
export default ChangeImage