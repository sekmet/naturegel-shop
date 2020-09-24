import React from 'react';
import PropTypes from "prop-types";
import { /*Link,*/ graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from "../../components/Layout/product";
//import Tabs from "../../components/utils/Tabs";
//import Tab from "../../components/utils/Tab";
import ProductForm from "../../components/ProductForm";
import SEO, { StructuredData } from '../../components/seo'

const parseMetafields = (metafields) => {
    const productMeta = new Map()
    metafields.map(meta => {
        productMeta.set(meta.key, meta.value)
        return true
    })

    return productMeta

}

const Product = ({ data, pageContext }) => {

    const product = data.shopifyProduct
    //let pTags = [...product.tags]
    //let ptag = pTags[0]
    let metaFields = parseMetafields(product.metafields)

    const {productpath} = pageContext

    let shopcurrency = 'BRL'

    const productFrienlyName = metaFields.get('friendlyname')
    /*const categoryUrl = metaFields.get('categoryurl')
    const productEssence = metaFields.get('essence')
    const productVolume = metaFields.get('volume')
    const productWeight = product.variants[0].weight
    const productPackingType = metaFields.get('packingtype')
    const productUnitsPerPack = metaFields.get('unitsperpack')
    const productDoser = metaFields.get('doser')*/
    const productBrand = metaFields.get('brand')
    //const productRegisterNumber = metaFields.get('registernumber')


    //structured data for products
    let variantOffers = []
    product.variants.map((prodvar) => {
        let iprodvar = {
            price: prodvar.price,
            url: `${productpath !== false && productpath !== "false" ? productpath : ''}/${product.handle}`,
            currency: shopcurrency
        }

        variantOffers.push(iprodvar)
        return true
    })

    let offerImages = []
    product.images.map(pImg => {
        let tmpImg = pImg.localFile ? pImg.localFile.childImageSharp.fluid.src : pImg.originalSrc
        offerImages.push(tmpImg)
        return true
    })

    let sData = {
        name: product.title,
        description: product.description,
        sku: product ? product.variants[0].sku : '',
        images: offerImages,
        vendor: product ? product.vendor : 'Naturegel Cosméticos',
        offers: variantOffers
    }

    return (
        <Layout>
            <SEO title={product.title}
                 description={`${product.description.substring(0,109)}...`}
                 keywords={[`naturegel`, `alcool`, `hidratante`, `antisseptico`, `alcool em gel`, `alcool gel`, `comprar alcool em gel`, `comprar alcool gel`, `aloe vera`, `calendula`, `mentolado`, `algas marinhas`, `pitaya`]}
            />
            <StructuredData type="product" data={sData} />
            <div className="container mx-auto flex items-center flex-wrap pt-3 pb-3">
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-6 mx-auto">
                        <div className="lg:w-full mx-auto flex flex-wrap">

                        <Img
                            fluid={product.images[0].localFile.childImageSharp.fluid}
                            alt={product.title}
                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                        />

                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h3 className="text-sm title-font text-gray-500 tracking-widest">{productBrand}</h3>
                            <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{productFrienlyName ? productFrienlyName : product.title}</h1>
                            <div className="flex mb-4">
                              <span className="flex items-center">
                                  {/*<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>*/}
                                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                       className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                  <path
                                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">0 Avaliações</span>
                              </span>
                                {/*<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                  </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                  </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                  </svg>
                                </a>
                              </span>*/}
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
                            <ProductForm product={product} />
                        </div>

                            {/*<div className="mt-3">
                        <table className="w-full mb-6">
                            <tbody>
                            <tr className="border-t">
                                <td className="py-3"><strong>Essência</strong></td>
                                <td className="text-right">{productEssence}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Peso</strong></td>
                                <td className="text-right">{productWeight}g</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Volume</strong></td>
                                <td className="text-right">{productVolume}ml</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Unidades por pacote</strong></td>
                                <td className="text-right">{productUnitsPerPack}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Tipo de embalagem</strong></td>
                                <td className="text-right">{productPackingType}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Dosador</strong></td>
                                <td className="text-right">{productDoser === true ? 'Sim' : 'Não'}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Marca</strong></td>
                                <td className="text-right">{productBrand}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3"><strong>Registro Anvisa</strong></td>
                                <td className="text-right">{productRegisterNumber}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>*/}

                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      shopifyId
      productType
      description  
      descriptionHtml
      tags
      vendor
      availableForSale 
      priceRange {
        maxVariantPrice {
            amount
            currencyCode
        }
        minVariantPrice {
            amount
            currencyCode
        }
      }
      metafields {
        key
        value
      }                
      options {
        id
        name
        values
      }
      variants {
        id
        sku
        title
        price
        compareAtPriceV2 {
          amount
          currencyCode
        }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        weight
        weightUnit
        availableForSale
      }
      images {
        originalSrc
        id
        altText
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      createdAt
      publishedAt
      updatedAt  
    }
  }
`

Product.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object
};

export default Product;