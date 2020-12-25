import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import { ModalProvider } from '../../providers/modal'
import CompPlansProvider from './CompPlansProvider'
import CompPlansTable from './CompPlansTable'
import CarriersProvider from '../carriers/CarriersProvider'

const CompPlansPage = () => {
  useDocumentTitle('Agency Comp - Comp Plans')

  return (
    <div className={'page data-comp-plans-page'}>
      <ModalProvider>
        <CarriersProvider>
          <CompPlansProvider>
            <CompPlansTable/>
          </CompPlansProvider>
        </CarriersProvider>
      </ModalProvider>
    </div>
  )
}

export default CompPlansPage
