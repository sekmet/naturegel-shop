import PropTypes from "prop-types";
import React, { useContext } from 'react'
import { Link, graphql } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import Img from 'gatsby-image'
import Layout from "../../components/Layout/shop"
import SEO from "../../components/seo"

/*const metaReplace = (textdata, find, replace) => {
    var replaceString = textdata
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i])
    }
    return replaceString
}*/

const slugify = require('@sindresorhus/slugify')

const EssencesPage = props => {

    const {data, pageContext} = props
    const { productpath } = pageContext

    const isBrowser = typeof window !== 'undefined'

    if (!isBrowser) return false

    const { store: {checkout} } = useContext(StoreContext)
    //let shopbtnlabel = 'Comprar'

    const getPrice = price => Intl.NumberFormat(undefined, {
        currency: checkout.currencyCode ? checkout.currencyCode : 'BRL',
        minimumFractionDigits: 2,
        style: 'currency',
    }).format(parseFloat(price ? price : 0))


    return (
        <Layout>
            <SEO title={`Produtos Naturegel`}
                 description={`O melhor Álcool em gel antisséptico hidratante de rápida absorção para as mãos.`}
                 keywords={[`naturegel`, `alcool`, `hidratante`, `antisseptico`, `alcool em gel`, `alcool gel`, `comprar alcool em gel`, `comprar alcool gel`, `aloe vera`, `calendula`, `mentolado`, `algas marinhas`, `pitaya`]}
            />
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            {data.allShopifyProduct.edges.map(x => (
                <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col" key={x.node.id}>
                    <Link to={`/${pageContext.productpath !== false && pageContext.productpath !== "false" ? productpath : ''}/${slugify(x.node.title)/*x.node.handle*/}`}>
                        <Img
                            fluid={x.node.images[0].localFile.childImageSharp.fluid}
                            className="hover:grow hover:shadow-lg w-full object-cover object-center rounded border border-gray-200"
                            alt={x.node.handle}
                        />
                        <div className="pt-3 flex items-center justify-between">
                            <p>{x.node.title}</p>
                            {/*<svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>*/}
                        </div>
                        <p className="pt-1 text-gray-900">{getPrice(x.node.variants[0].price)}</p>
                    </Link>
                </div>
            ))}
            </div>
        </Layout>
    )
}


export const query = graphql`
    query($essenceregex: String!, $skip: Int!) {
        allShopifyProduct(
            limit: 36,
            skip: $skip,
            filter: {metafields: {elemMatch: {value: {regex: $essenceregex}, key: {eq: "essence"}}}},
            sort: {
                fields: [availableForSale]
                order: DESC
            }
        ) {
            edges {
                node {
                    id
                    title
                    vendor
                    description
                    handle
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
                    images {
                        id
                        altText
                        originalSrc
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 910) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                }
                            }
                        }
                    }
                    variants {
                      sku
                      price
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                      weight
                      weightUnit
                      availableForSale
                    }
                    tags
                    createdAt
                    publishedAt
                    updatedAt                      
                }
            }
        }
    }
`

EssencesPage.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object
};


export default EssencesPage
