import React, { useContext } from 'react'
import { DataTable } from '../table'
import ProductsContext from './ProductsContext'


const ProductTypesTable = () => {
    const {
        productTypeSingular,
        productTypes,
        productTypeColumns,
        selectedProduct,
        selectedProductType,
        setSelectedProductType,
        loadProductTypes,
        loadProductType,
        openProductTypeAddModal,
        openProductTypeEditModal,
        openProductTypeDeleteModal,
    } = useContext(ProductsContext)

    return (
        <DataTable
            dataName={productTypeSingular}
            data={productTypes}
            columns={productTypeColumns}
            selected={selectedProductType}
            setSelected={setSelectedProductType}
            loadData={() => {}}
            loadSingle={loadProductType}
            openAddModal={openProductTypeAddModal}
            openEditModal={openProductTypeEditModal}
            openDeleteModal={openProductTypeDeleteModal}
            tableWidth={9}
            sidebarWidth={3}
            searchEnabled={false}
            // exportEnabled={false}
            multiSelectEnabled={false}
            noDataMessage={selectedProduct ?
                'No types found for this product.' :
                'Please select a product.'}
        />
    )
}

export default ProductTypesTable
