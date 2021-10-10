import { FormModel } from '@mars-man/models'
import * as React from 'react'



export const Form = ({form, children}: {
    form?: FormModel,
    children: React.ReactNode
}) => {
    if(!form) return undefined
    return <div>
        {children}
    </div>
}