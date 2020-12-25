import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import { ModalProvider } from '../../providers/modal'
import PoliciesProvider from './PoliciesProvider'
import PoliciesTable from './PoliciesTable'

const PoliciesPage = () => {
  useDocumentTitle('Agency Comp - Policies')

  return (
    <div className={'page data-policies-page'}>
      <ModalProvider>
        <PoliciesProvider>
          <PoliciesTable/>
        </PoliciesProvider>
      </ModalProvider>
    </div>
  )
}

export default PoliciesPage
