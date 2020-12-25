import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useState } from 'react'
import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import AddProductModal from './AddProductModal'
import AddProductTypeModal from './AddProductTypeModal'
import DeleteProductOrTypeModal from './DeleteProductOrTypeModal'
import EditProductModal from './EditProductModal'
import EditProductTypeModal from './EditProductTypeModal'
import ProductsContext from './ProductsContext'

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [productTypes, setProductTypes] = useState([])
  const [selectedProductType, setSelectedProductType] = useState(null)

  const loadingWrapper = useContext(LoadingContext)

  const { setModalContent, closeModal } = useContext(ModalContext)

  const productSingular = 'Product'
  const productPlural = productSingular + 's'
  const productTypeSingular = 'Product Type'
  const productTypePlural = productTypeSingular + 's'

  const productColumns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Product',
    },
  ]

  const productTypeColumns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Product Type',
    },
  ]

  const loadProducts = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/products')
          setProducts(response.content)
        } catch (err) {
          toastr.error('Unable to load products.')
          throw err
        }
      },
    )
  ), [])

  const loadProduct = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            row.policyCount = await fetchWrapper(`/policies/count-by-product/${row.id}`)
            setSelectedProduct(row)

            loadProductTypes(row.id)
          } catch (err) {
            toastr.error('Unable to load products.')
            throw err
          }
        } else {
          setSelectedProduct(null)
        }
      },
    )
  ), [selectedProduct])

  const onProductAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await postWrapper('/products', {
            ...data,
          })
          closeModal()
          loadProducts()
          toastr.success('Product created successfully.')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create product ' + selectedProduct.name + '.')
          }
          throw err
        }
      })
  }

  const onProductEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await putWrapper('/products', {
            ...selectedProduct,
            ...data,
          })
          closeModal()
          loadProducts()
          toastr.success('Product updated.', 'Success', {
            timeOut: 1000,
            extendedTimeOut: 10000,
          })
        } catch (err) {
          toastr.error('Unable to update product ' + selectedProduct.name + '.')
          throw err
        }
      })
  }

  const onProductDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await deleteWrapper(`/products/${selectedProduct.id}`)
          closeModal()
          loadProducts()
          toastr.success('Product deleted.', 'Success')
        } catch (err) {
          toastr.error('Unable to delete product ' + selectedProduct.name + '.')
          throw err
        }
      })
  }

  const loadProductTypes = useCallback((productId) => (
    loadingWrapper(
      async () => {
        if (productId) {
          try {
            const response = await fetchWrapper(`/products/${productId}/types`)
            setProductTypes(response)
          } catch (err) {
            toastr.error('Unable to load product types.')
            throw err
          }
        }
      },
    )
  ), [])

  const loadProductType = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            row.policyCount = await fetchWrapper(`/policies/count-by-product-type/${row.id}`)
            setSelectedProductType(row)
          } catch (err) {
            toastr.error('Unable to load product types.')
            throw err
          }
        } else {
          setSelectedProductType(null)
        }
      },
    )
  ), [selectedProductType, selectedProduct])

  const onProductTypeAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await postWrapper('/product-types/', {
            ...data,
          })
          closeModal()
          loadProductTypes(data.productId)
          toastr.success('Product type created successfully.')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create product type ' + selectedProductType.name + '.')
          }
          throw err
        }
      })
  }

  const onProductTypeEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await putWrapper(`/product-types/${selectedProduct.id}/types`, {
            ...selectedProductType,
            ...data,
          })
          closeModal()
          loadProductTypes(data.productId)
          toastr.success('Product type updated.', 'Success', {
            timeOut: 0,
            extendedTimeOut: 0,
          })
        } catch (err) {
          toastr.error('Unable to update product type ' + selectedProductType.name + '.')
          throw err
        }
      })
  }

  const onProductTypeDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await deleteWrapper(`/product-types/${selectedProductType.id}`)
          closeModal()
          loadProductTypes(data.productId)
          toastr.success('Product type deleted.', 'Success')
        } catch (err) {
          toastr.error('Unable to delete product type ' + selectedProductType.name + '.')
          throw err
        }
      })
  }

  const openProductAddModal = useCallback(() => {
    setModalContent(() => (
      <AddProductModal
        singular={productSingular}
        onSubmit={onProductAddSubmit}
        closeModal={closeModal}/>
    ))
  })
  const openProductEditModal = useCallback(() => setModalContent(() => (
    <EditProductModal
      singular={productSingular}
      selected={selectedProduct}
      onSubmit={onProductEditSubmit}
      closeModal={closeModal}/>
  )))
  const openProductDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteProductOrTypeModal
      singular={productSingular}
      selected={selectedProduct}
      onSubmit={onProductDeleteSubmit}
      closeModal={closeModal}/>
  )))

  const openProductTypeAddModal = useCallback(() => setModalContent(() => (
    <AddProductTypeModal
      singular={productTypeSingular}
      onSubmit={onProductTypeAddSubmit}
      closeModal={closeModal}/>
  )))
  const openProductTypeEditModal = useCallback(() => setModalContent(() => (
    <EditProductTypeModal
      singular={productTypeSingular}
      selected={selectedProductType}
      onSubmit={onProductTypeEditSubmit}
      closeModal={closeModal}/>
  )))
  const openProductTypeDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteProductOrTypeModal
      singular={productTypeSingular}
      selected={selectedProductType}
      onSubmit={onProductTypeDeleteSubmit}
      closeModal={closeModal}/>
  )))

  return (
    <ProductsContext.Provider
      value={{
        productSingular,
        productPlural,
        products,
        productColumns,
        selectedProduct,
        setSelectedProduct,
        loadProducts,
        loadProduct,
        openProductAddModal,
        openProductEditModal,
        openProductDeleteModal,
        productTypeSingular,
        productTypePlural,
        productTypes,
        productTypeColumns,
        selectedProductType,
        setSelectedProductType,
        loadProductTypes,
        loadProductType,
        openProductTypeAddModal,
        openProductTypeEditModal,
        openProductTypeDeleteModal,
      }}>
      {children}
    </ProductsContext.Provider>
  )
}

ProductsProvider.propTypes = {
  children: node.isRequired,
}

export default ProductsProvider
