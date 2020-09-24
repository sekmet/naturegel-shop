import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import StoreContext from '../../context/StoreContext'
import VariantSelector from './variant_selector'
import ShopifyBuyButton from '../../components/BuyButton'

const ProductForm = ({ product }) => {
  const {
      //options,
      //variants,
      variants: [initialVariant],
      priceRange: { minVariantPrice },
  } = product
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState({ ...initialVariant })
  const {
      store: { client }
  } = useContext(StoreContext)

  const hasVariants = product.variants.length > 1
  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  useEffect(() => {
    let defaultOptionValues = {}
    product.options.forEach(selector => {
      defaultOptionValues[selector.name] = selector.values[0]
    })
    setVariant(defaultOptionValues)
  }, [])

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant])

  //const isBrowser = typeof window !== 'undefined'

  /*const checkAvailability = productId => {
    client.product.fetch(productId).then((product) => {
      // this checks the currently selected variant for availability
      const result = product.variants.filter(
        variant => variant.id === productVariant.shopifyId
      )
      setAvailable(result[0].available)
    })
  }*/
  const checkAvailability = useCallback(
    productId => {
        client.product.fetch(productId).then(fetchedProduct => {
            // this checks the currently selected variant for availability
            const result = fetchedProduct.variants.filter(
                variant => variant.id === productVariant.shopifyId
            )
            if (result.length > 0) {
                setAvailable(result[0].available)
            }
        })
    },
    [client.product, productVariant.shopifyId]
  )
 
  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handleOptionChange = event => {
    const { target } = event
    setVariant(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  /*const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }*/

  const variantSelectors = hasVariants
    ? product.options.map(option => {
        return (
          <VariantSelector
            onChange={handleOptionChange}
            key={option.id.toString()}
            option={option}
          />
        )
      })
    : null


    const price = Intl.NumberFormat(undefined, {
        currency: minVariantPrice.currencyCode,
        minimumFractionDigits: 2,
        style: 'currency',
    }).format(productVariant.price)

    const amount = Intl.NumberFormat(undefined, {
        currency: minVariantPrice.currencyCode,
        minimumFractionDigits: 2,
        style: 'currency',
    }).format(productVariant.compareAtPriceV2.amount)

    let hasDiscount = !(parseFloat(productVariant.compareAtPriceV2.amount) === parseFloat(productVariant.price))
    let percentDiscount = 0
    if (hasDiscount) {
        let valA = parseFloat(productVariant.compareAtPriceV2.amount)
        let valB = parseFloat(productVariant.price)
        percentDiscount = Math.floor(100 * Math.abs( (valA - valB) / ( (valA+valB)/2 ) ))
    }
    const redirectToAvailableToSale = (product_url) => {
        useEffect(() => {
        window.location = product_url
        }, [product_url])
    }


  return (
    <>
    {/*<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        <div className="flex">
            <span className="mr-3">Essência</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
        </div>
        <div className="flex ml-6 items-center">
            <span className="mr-3">Tamanho</span>
            <div className="relative">
                <select
                    className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-3">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
                <span
                    className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
             className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
            </div>
        </div>
    </div>*/}

    <div className="flex mt-6">
        <div className="w-1/2 lg:w-1/4 py-2">
            <label htmlFor="quantity"><strong>Quantidade:</strong></label>
        </div>
        <div className="w-1/2">
            <input
                className="bg-white w-36 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 block appearance-none"
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={handleQuantityChange}
                value={quantity}
            />
        </div>
    </div>
    {variantSelectors}
    <div className="flex mt-6 mb-5">
        <span className="title-font font-bold text-2xl text-green-600 align-middle">{price}</span>
        <span className="text-sm font-bold bg-red-500 py-2 px-2 rounded text-white ml-3 align-middle h-9">-{percentDiscount}%</span>
        <span className="text-sm font-medium text-xl align-middle py-1 text-gray-400 ml-3 line-through">{amount}</span>
        {/*<button
            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-3">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                 strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
        </button>*/}
    </div>
    <div className="flex">
        {!available ? redirectToAvailableToSale(`${product.handle}-1`) /*<h4 className="text-xl text-red-300">Produto indisponível no momento</h4>*/
        :
        <ShopifyBuyButton productId={product.id} options={product.options} />}
    </div>
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    currency: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    priceRange: PropTypes.shape({
      minVariantPrice: PropTypes.shape({
          currencyCode: PropTypes.string,
      }),
    }),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
