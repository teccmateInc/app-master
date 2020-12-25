import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import ModalProvider from '../../providers/modal/ModalProvider'
import ProducersProvider from '../producers/ProducersProvider'
import ProducersTable from '../producers/ProducersTable'


const ProducersPage = () => {
    useDocumentTitle('Agency Comp - Producers')

    return (
        <div className={'page data-producers-page'}>
            <ModalProvider>
                <ProducersProvider>
                    <ProducersTable/>
                </ProducersProvider>
            </ModalProvider>
        </div>
    )
}

export default ProducersPage
