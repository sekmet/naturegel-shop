const path = require(`path`)
const slugify = require('@sindresorhus/slugify')
const permalink = require('permalinks')
const createPaginatedPages = require('@sekmet/gatsby-paginate')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  let basePath = '/loja'
  let basePermalink = '/:base'
  let collectionPath = 'c'
  let collectionPermalink = ['/:collectionbase/:collectionproducts']
  let createTagPages = false
  let tagCategories = false
  let tagPath = false
  let tagPermalink = '/:tagbase/:tagproducts'
  let productPath = 'p'
  let productPermalink = '/:productbase/:product'
  let usePagination = false
  let itemsPerPage = 4
  let collectionTplPath = false //'./src/templates/products/bycollection.js'
  let categoryTplPath = false //'./src/templates/products/bycategory.js'
  let tagTplPath = false //'./src/templates/products/bytag.js'
  let productsTplPath = false //'./src/templates/products/index.js'
  let productTplPath = false //'./src/templates/product_page/index.js'

  return graphql(`
    {
      allShopifyCollection {
        group(field: products___tags) {
          fieldValue
          nodes {
            handle
            title
          }
        }      
        edges {
          node {
            id
            collection: handle
            title
            shopifyId
          }
        }
      }    
      allmetacollection: allShopifyProductMetafield(filter: {key: {eq: "_collectinfo"}}) {
        edges {
          node {
            value
          }
        }
      }
      allmetacategory: allShopifyProductMetafield(filter: {key: {eq: "categoryurl"}}) {
        edges {
          node {
            value
          }
        }
      }
      allmetaessences: allShopifyProductMetafield(filter: {key: {eq: "essence"}}) {
        edges {
          node {
            value
          }
        }
      }           
      allShopifyProduct {
        distinct(field: tags)
        metavalues: group(field: metafields___value) {
          totalCount
          fieldValue
        }        
        group(field: tags) {
          totalCount
          fieldValue
        }
        edges {
          node {
            id
            handle
            variants {
              sku
            }            
            metafields {
              key
              value
            }              
          }
        }
        pageInfo {
          pageCount
          perPage
          itemCount
          currentPage
          hasNextPage
          hasPreviousPage
        }        
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      console.log(errors)
      reject(errors)
    }


    //#################################################################################
    //METAFIELDS - category urls
    const metaFields = new Set
    data.allmetacategory.edges.forEach(( {node} ) => {
      metaFields.add(node.value)
    })

    const metaValues = new Set
    const counters = []
    data.allShopifyProduct.metavalues.forEach( metaval  => {
      Array.from(metaFields).map(metaF => {
        if (metaF === metaval.fieldValue){
          let hasSubItem = metaF.match(/([^\/]+\/)([^\/]+\/)([^\/]+\/)(.*)/)

          if (hasSubItem){
            //console.log('hasSubItem === ', hasSubItem[4])
            let parentCategory = metaF.replace(`/${hasSubItem[4]}`,'')
            //console.log('parent category === ', parentCategory)
            //console.log(`${hasSubItem[4]} Total Count === `, metaval.totalCount)
            counters[parentCategory] = counters[parentCategory] ? parseInt(counters[parentCategory]) + parseInt(metaval.totalCount) : parseInt(metaval.totalCount)

            // Delete any parentCategory if alredy exists
            metaValues.forEach(function(categorypath){
              if (categorypath.path === parentCategory) {
                metaValues.delete(categorypath);
              }
            });

            metaValues.add({path: parentCategory, totalCount: counters[parentCategory]})
          }

          metaValues.add({path: metaF, totalCount: metaval.totalCount})
        }
      })

    })
    //######################################################################################

    Array.from(metaValues).map(metaCategory => {
      if (usePagination && metaCategory.totalCount) {

        createPaginatedPages({
          edges: Array(metaCategory.totalCount).fill({node:{id:'zero'}}),
          createPage: createPage,
          //pageTemplate: categoryTplPath !== false && categoryTplPath !== "false" ? path.resolve(categoryTplPath) : path.resolve(`./src/templates/CategoryPage/index.js`),
          pageTemplate: path.resolve(`./src/templates/category/index.js`),
          pageLength: itemsPerPage, // This is optional and defaults to 10 if not used
          pathPrefix: `${metaCategory.path}`,
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            //producttag: `${tag.fieldValue}`,
            //productcollection: `${tagCollection}`,
            basepath: `${basePath}`,
            collectionpath: `${collectionPath}`,
            categoryregex: `${metaCategory.path}/`,
            tagpath: `${tagPath}`,
            productpath: `${productPath}`
          },
        })

      } else {

        createPage({
          path: metaCategory.path,
          //component: categoryTplPath !== false && categoryTplPath !== "false" ? path.resolve(categoryTplPath) : path.resolve(`./src/templates/CategoryPage/index.js`),
          component: path.resolve(`./src/templates/category/index.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            //producttag: `${tag.fieldValue}`,
            //productcollection: `${tagCollection}`,
            pathPrefix: `${metaCategory.path}`,
            basepath: `${basePath}`,
            collectionpath: `${collectionPath}`,
            categoryregex: `${metaCategory.path}/`,
            productpath: `${productPath}`,
            //to allow pagination off
            limit: -1,
            skip: 0
          },
        })

      }

    })
    //#######################################################################################



    //#################################################################################
    //METAFIELDS - Essences
    const metaEssenceFields = new Set
    data.allmetaessences.edges.forEach(( {node} ) => {
      metaEssenceFields.add(node.value)
    })

    const metaEssenceValues = new Set
    data.allShopifyProduct.metavalues.forEach( metaval  => {
      Array.from(metaEssenceFields).map(metaS => {
        if (metaS === metaval.fieldValue){

          //exception
          //neutro == aloe-vera
          if (metaS === 'Neutro')
            metaS = 'Aloe Vera'

          metaEssenceValues.add({path: slugify(metaS), totalCount: metaval.totalCount})
        }
      })

    })
    //######################################################################################

    Array.from(metaEssenceValues).map(metaEssence => {
      if (usePagination && metaEssence.totalCount) {

        createPaginatedPages({
          edges: Array(metaEssence.totalCount).fill({node:{id:'zero'}}),
          createPage: createPage,
          //pageTemplate: categoryTplPath !== false && categoryTplPath !== "false" ? path.resolve(categoryTplPath) : path.resolve(`./src/templates/CategoryPage/index.js`),
          pageTemplate: path.resolve(`./src/templates/category/essences.js`),
          pageLength: itemsPerPage, // This is optional and defaults to 10 if not used
          pathPrefix: `/${collectionPath}/${metaEssence.path}`,
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            //producttag: `${tag.fieldValue}`,
            //productcollection: `${tagCollection}`,
            basepath: `${basePath}`,
            collectionpath: `${collectionPath}`,
            essenceregex: `/${metaEssence.path}/`,
            tagpath: `${tagPath}`,
            productpath: `${productPath}`
          },
        })

      } else {

        createPage({
          path: metaEssence.path,
          //component: categoryTplPath !== false && categoryTplPath !== "false" ? path.resolve(categoryTplPath) : path.resolve(`./src/templates/CategoryPage/index.js`),
          component: path.resolve(`./src/templates/category/essences.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            //producttag: `${tag.fieldValue}`,
            //productcollection: `${tagCollection}`,
            pathPrefix: `${metaEssence.path}`,
            basepath: `${basePath}`,
            collectionpath: `${collectionPath}`,
            essenceregex: `/${metaEssence.path}/`,
            productpath: `${productPath}`,
            //to allow pagination off
            limit: -1,
            skip: 0
          },
        })

      }

    })
    //#######################################################################################





    //ALL PRODUCTS PAGES ####################################################################
    data.allShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: permalink(productPermalink, {base: basePath,  productbase: productPath, product: node.handle, sku: slugify(node.variants[0].sku)}),
        component: path.resolve(`./src/templates/product/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
          basepath: `${basePath}`,
          collectionpath: `${collectionPath}`,
          tagpath: `${tagPath}`,
          productpath: `${productPath}`,
          //to allow pagination off
          limit: -1,
          skip: 0
        },
      })
    })

  })
}
