import React from 'react'

export default class ErrorBoundary extends React.Component{

    state = {
        hasError : false
    }

    static getDerivedStateFromError(error){
        return { hasError: true}
    }

    componentDidCatch(error, info){
        console.error(error, info)
    }

    render(){
        if(this.state.hasError){
            return(
                <h1>Произошла ошибка, проверьте консоль</h1>
            )
        }

        return this.props.children
    }
}