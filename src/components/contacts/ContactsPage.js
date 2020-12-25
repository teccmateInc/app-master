import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import { ModalProvider } from '../../providers/modal'
import ContactsProvider from './ContactsProvider'
import ContactsTable from './ContactsTable'


const ContactsPage = () => {
    useDocumentTitle('Agency Comp - Contacts')

    return (
        <div className={'page data-contacts-page'}>
            <ModalProvider>
                <ContactsProvider>
                    <ContactsTable/>
                </ContactsProvider>
            </ModalProvider>
        </div>
    )
}

export default ContactsPage
