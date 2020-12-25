import useDocumentTitle from '@tanem/use-document-title'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ModalProvider from '../../providers/modal/ModalProvider'
import ProductsProvider from '../products/ProductsProvider'
import ProductsTable from '../products/ProductsTable'
import ProductTypesTable from './ProductTypesTable'


const ProductsPage = () => {
    useDocumentTitle('Agency Comp - Products')

    return (
        <div className={'page data-products-page'}>
            <ModalProvider>
                <ProductsProvider>
                    <Row>
                        <Col
                            xs={5}
                        >
                            <ProductsTable/>
                        </Col>
                        <Col
                            xs={1}
                        >
                            {/*TODO - move to CSS or SCSS*/}
                            <div style={{
                                borderLeft: '1px solid #000',
                                height: '500px',
                                position: 'absolute',
                                left: '50%'
                            }}></div>
                        </Col>
                        <Col
                            xs={5}
                        >
                            <ProductTypesTable/>
                        </Col>
                    </Row>
                </ProductsProvider>
            </ModalProvider>
        </div>
    )
}

export default ProductsPage
