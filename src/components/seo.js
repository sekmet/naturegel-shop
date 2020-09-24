/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import moment from "moment"
import { useStaticQuery, graphql } from "gatsby"
import {
  JSONLD,
  AdministrativeArea,
  Product,
  AggregateRating,
  Review,
  Rating,
  Brand,
  Thing,
  OfferCollection,
  Offer,
  Person,
  Organization,
  ImageObject,
  Article,
  MainEntityOfPage,
  WebPage
} from "@sekmet/react-structured-data"

export const StructuredData = ({type, data}) => {

  if (type === 'article'){

    if (data && typeof data === 'object')
      return (
        <JSONLD>
          <Article type="Article"
                   headline={data.headline ? `${data.headline.substring(0,109)}` : `${data.description.substring(0,106)}...` }
                   description={data.description ? data.description : "A most wonderful article"}
                   datePublished={data.date ? moment(data.date).format() : moment().format()}
                   dateModified={data.date ? moment(data.date).format() : moment().format()}
                   image={data.images}
          >
            <MainEntityOfPage type="mainEntityOfPage">
              <WebPage id={data.urlpage ? data.urlpage : ""} />
            </MainEntityOfPage>
            <Person type="author" name={data.author ? data.author : "the author"}/>
            <Organization type="publisher" name={data.publisher ? data.publisher : "Google"}>
              <ImageObject type="logo" url={data.publisherlogo ? data.publisherlogo : "https://google.com/logo.jpg"}/>
            </Organization>
          </Article>
        </JSONLD>
      )
    else
      return false
  }

  if (type === 'product'){

    if (data && typeof data === 'object')
      return (
        <JSONLD>
          <Product
            type="Product"
            name={data.name ? data.name : ''}
            description={data.description ? data.description : ''}
            sku={data.sku ? data.sku : ''}
            mpn={data.mpn ? data.mpn : ''}
            image={data.images}
          >
            {data.vendor ?
              <Brand type="brand">
                <Thing name={data.vendor} />
              </Brand>
              : ''}

            {data.offers ?
              <OfferCollection type="offers">

                {data.offers.map((offer, idx) => (
                  <Offer url={offer.url}
                         price={offer.price}
                         priceCurrency={offer.currency}
                         priceValidUntil={offer.validuntil ? offer.validuntil : moment().add(90, 'days').format()}
                         itemCondition="https://schema.org/UsedCondition"
                         availability="https://schema.org/InStock"
                         key={idx}
                  >
                    <Organization type="seller" name={data.vendor} />
                  </Offer>
                ))}

              </OfferCollection>
              : ''}

            {data.review ?
              <Review
                type="review"
                name="It's awesome"
                reviewBody="This is Great! My family loves it"
                datePublished="11/22/1963"
              >
                <Person type="author" name="Jerry" />
                <AdministrativeArea type="locationCreated" name="Chicago, IL" />
                <Rating type="reviewRating" ratingValue={5}></Rating>
                <Product type="itemReviewed" name="Product Name" id="product-x" />
              </Review>
              : ''}

            {data.aggrating ?
              <AggregateRating type="AggregateRating" ratingValue={4.5} reviewCount={33} itemReviewed="ACME Classic Anvil">
              </AggregateRating>
              : ''}
          </Product>
        </JSONLD>
      )
    else
      return false

  }

}

function SEO({
               description,
               lang,
               meta,
               title,
               author,
               keywords,
               image,
               isPost,
             }) {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            siteLogo
            keywords
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaAuthor = author || site.siteMetadata.author
  const metaKeywords = keywords || [] //site.siteMetadata.keywords
  const twitterUser = site.siteMetadata.social.twitter

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: isPost ? `article` : `website`,
        },
        {
          property: "og:image:alt",
          content: image ? image.alt : ``
        },
        {
          name: `twitter:site`,
          content: twitterUser,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: metaAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: "twitter:image:alt",
          content: image ? image.alt : ``
        },
      ]
        .concat(
          metaKeywords.length > 0
            ? {
              name: `keywords`,
              content: metaKeywords.join(`, `),
            }
        : []
      )
        .concat(meta)
        .concat(
        // handle Secure Image
        image && image.src.indexOf("https") > -1
          ? [
            {
              property: "twitter:image:secure_url",
              content: image.src,
            },
            {
              property: "og:image:secure_url",
              content:image.src
            },
          ]
          : []
      )}
    />
  )
}

SEO.defaultProps = {
  lang: `pt-br`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  isPost: PropTypes.bool,
  image:PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
  }),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO