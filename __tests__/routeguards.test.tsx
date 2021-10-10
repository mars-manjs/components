import * as React from 'react'
import {LoadedRoute} from '../src'
import { render, screen } from "@testing-library/react";
import { Model, MockRepo } from '@mars-man/models'
import '@testing-library/jest-dom';


const LoadedComponent = () => {
    return <div>loaded</div>
}
const UnloadedComponent = () => {
    return <div>unloaded</div>
}
const LoadingComponent = () => {
    return <div>loading</div>
}
const ErrorComponent = () => {
    return <div>error</div>
}

describe('LoadedGuard', ()=>{
    test('should show correct component for state', async ()=>{
        const model = new Model({
            repos: new MockRepo({data: undefined})
        })
        const {getByText} = render(<LoadedRoute model={model} 
            Component={LoadedComponent}
            UnloadedComponent={UnloadedComponent}
            LoadingComponent={LoadingComponent}
            />)

        // check if it's unloaded before loading
        expect(getByText('unloaded')).toBeInTheDocument()
        expect(model.state).toBe('unloaded')


        // Load Model
        const promise = model.load()
        expect(getByText('loading')).toBeInTheDocument()
        expect(model.state).toBe('loading')


        // Wait for it to finish loading
        await promise
        expect(getByText('loaded')).toBeInTheDocument()
        expect(model.state).toBe('loaded')
    })

    test('should show correct LoadedState during reloading', async ()=>{
        const model = new Model({
            repos: new MockRepo({data: undefined})
        })
        const {getByText} = render(<LoadedRoute model={model} 
            Component={LoadedComponent}
            UnloadedComponent={UnloadedComponent}
            LoadingComponent={LoadingComponent}
            />)

        // check if it's unloaded before loading
        expect(getByText('unloaded')).toBeInTheDocument()
        expect(model.state).toBe('unloaded')


        // Load Model
        let promise = model.load()
        expect(getByText('loading')).toBeInTheDocument()
        expect(model.state).toBe('loading')

        
        // Wait for it to finish loading
        await promise
        expect(getByText('loaded')).toBeInTheDocument()
        expect(model.state).toBe('loaded')

        
        // state is reloading, component is loaded
        promise = model.load()
        expect(getByText('loaded')).toBeInTheDocument()
        expect(model.state).toBe('reloading')


        // Wait for it to finish loading
        await promise
        expect(getByText('loaded')).toBeInTheDocument()
        expect(model.state).toBe('loaded')
    })


    test('should show error component', async ()=>{
        const model = new Model({
            repos: new MockRepo({data: undefined, finalState: 'error'})
        })
        const {getByText} = render(<LoadedRoute model={model} 
            Component={LoadedComponent}
            ErrorComponent={ErrorComponent}
            />)
        
        await model.load()
        expect(getByText('error')).toBeInTheDocument()
        expect(model.state).toBe('error')
    })
})