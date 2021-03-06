import * as React from 'react'
import { Model } from '@mars-man/models'
import {observer} from 'mobx-react'


export const LoadedRoute = observer((props: {
    model: Model
    Component: React.ComponentType
    LoadingComponent?: React.ComponentType
    UnloadedComponent?: React.ComponentType
    ErrorComponent?: React.ComponentType
}) => {
    let { model, Component, LoadingComponent,
        UnloadedComponent, ErrorComponent, ...rest } = props

    switch (model.state) {
        case 'reloading': {
            return <Component {...rest} />
        }
        case 'loaded': {
            return <Component {...rest} />
        }
        case 'loading': {
            return LoadingComponent ? <LoadingComponent /> : null
        }
        case 'unloaded': {
            return UnloadedComponent ? <UnloadedComponent /> : null
        }
        case 'error': {
            return ErrorComponent ? <ErrorComponent /> : null
        }
    }
})