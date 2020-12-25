import React, { useContext } from 'react'
import { DataTable } from '../table'
import ProductsContext from './ProductsContext'


const ProductsTable = () => {
    const {
        productSingular,
        products,
        productColumns,
        selectedProduct,
        setSelectedProduct,
        loadProducts,
        loadProduct,
        openProductAddModal,
        openProductEditModal,
        openProductDeleteModal,
    } = useContext(ProductsContext)

    return (
        <DataTable
            dataName={productSingular}
            data={products}
            columns={productColumns}
            selected={selectedProduct}
            setSelected={setSelectedProduct}
            loadData={loadProducts}
            loadSingle={loadProduct}
            openAddModal={openProductAddModal}
            openEditModal={openProductEditModal}
            openDeleteModal={openProductDeleteModal}
            tableWidth={9}
            sidebarWidth={3}
            searchEnabled={false}
            // exportEnabled={false}
            multiSelectEnabled={false}
        />
    )
}

export default ProductsTable
