import { gql } from '@apollo/client'


// $name:String!,
// $parentCategoryUid: String!
// {
//     name: $name,
//     parentCategoryUid: $parentCategoryUid

// }

export const CREATE_CATEGORY = gql`
mutation CreateCategory($name:String! $parentCategoryUid:String! ) {
    createCategory(category:{
        name:$name
        parentCategoryUid:$parentCategoryUid

    }) {
      message
      result {
        createdAt
        name
        parent {
          name
          uid
        }
        uid
      }
    }
  }
  
`


export const UPDATE_CATAEGORY = gql`


mutation CreateCategory($name:String! $categoryUid:String! ) {
    updateCategory(category: {
        name:$name
    }, categoryUid: $categoryUid) {
      message
      result {
        createdAt
        name
        parent {
          name
          uid
        }
        uid
        updatedAt
      }
    }
  }
`