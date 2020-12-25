import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import { ModalProvider } from '../../providers/modal'
import CarriersProvider from './CarriersProvider'
import CarriersTable from './CarriersTable'


const CarriersPage = () => {
    useDocumentTitle('Agency Comp - Carriers')

    return (
        <div className={'page data-carriers-page'}>
            <ModalProvider>
                <CarriersProvider>
                    <CarriersTable/>
                </CarriersProvider>
            </ModalProvider>
        </div>
    )
}

export default CarriersPage
