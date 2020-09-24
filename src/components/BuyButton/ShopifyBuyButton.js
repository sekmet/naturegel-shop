import PropTypes from 'prop-types'
import React from "react"
//import { useStaticQuery, graphql } from "gatsby"
// these two libraries are client-side only
import Client from "shopify-buy"
import ShopifyBuy from "@shopify/buy-button-js"

/*const options = useStaticQuery(graphql`
    query ShopifyButtonQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`)*/

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ? process.env.GATSBY_SHOPIFY_ACCESS_TOKEN : process.env.SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME ? process.env.GATSBY_SHOP_NAME : process.env.SHOP_NAME}.myshopify.com`,
})
const shopifyUI = ShopifyBuy.UI.init(client)
// custom component using shopify client-side libraries
class ShopifyBuyButton extends React.Component {
  componentDidMount() {
    //add button js
    //console.log('this.props.productId == > ', this.props.productId)
    let productId = null
    // extract base64id
    var b64id = `${this.props.productId}`.split('__')[2]
    if (b64id !== 'undefined'){
      var productGid = atob(b64id)
      productId = `${productGid}`.split('Product/')[1]
    }

    //console.log('productId base64id == > ', productId)
    // className=""

    if (productId !== null)
    shopifyUI.createComponent('product', {
      id: productId,
      node: document.getElementById(`my-product-${this.props.productId}`),
      options: {
        product: {
          text     : { button: 'Comprar' },
          //classes  : { button: 'flex ml-auto w-full text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded'},
          iframe   : true,
          contents : {
            img   : false,
            title : false,
            price : false,
            options: false
          },
          templates : {
            button : '<button class="{{data.classes.product.button}}">{{data.buttonText}}</button>'
          },
          buttonDestination: 'cart',
          quantiyLabel: 'Quantidade',
          /*events: {
            addVariantToCart: function (event) {
              console.log('addVariantToCart', event)
            }
          }*/
        },
        toggle: {
          sticky: true,
          iframe   : true,
          contents: {
            count: true,
            icon: true,
            title: false,
          },
          styles: {
            toggle: {
              'background-color': '#a0c03c',
              ':hover': {
                'background-color': '#8aab33'
              },
              ':focus': {
                'background-color': '#8aab33'
              }
            }
          }
        },
        cart: {
          startOpen: false,
          iframe: true,
          contents: {
            title: true,
            lineItems: true,
            footer: true,
            note: true,
          },
          text: {
            title: 'Meu Carrinho',
            empty: 'Sua sacola está vazia!',
            button: 'Finalizar Compra',
            total: 'Total',
            currency: 'BRL',
            notice: 'Códigos de envio e desconto são adicionados na finalização da compra.',
            noteDescription: 'Instruções especiais para o comprador aqui!',
          },
          styles: {
            button: {
              'background-color': '#a0c03c',
              ':hover': {
                'background-color': '#8aab33'
              },
              ':focus': {
                'background-color': '#8aab33'
              }
            }
          },
          popup: false
        }
      }
    });
  }

  render() {
  return (<div id={`my-product-${this.props.productId}`}></div>)
  }
}


ShopifyBuyButton.propTypes = {
  productId: PropTypes.string,
}

export default ShopifyBuyButton