import { gql } from '@apollo/client'

export const GET_ALL_CATEGORY = gql`
query{
    getCategories(pagination:{
        limit:15000
    }){
        message
        result {
            categories{
                name
                parent{
                    name
                    uid
                }
                uid
                updatedAt
            }
           
        }
    }
}
`