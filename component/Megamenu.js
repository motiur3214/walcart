import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useEffect, useState } from 'react'
import { GET_ALL_CATEGORY } from '../GraphQl/Queries'
import { RiDeleteBinLine, RiEdit2Fill } from 'react-icons/ri';
import { CREATE_CATEGORY, UPDATE_CATAEGORY } from '../GraphQl/Mutations';


const Megamenu = () => {

  const [menus, setMenus] = useState([])
  const [parentCategory, setParentCategory] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const { error, loading, data } = useQuery(GET_ALL_CATEGORY)
  const [selectCata1, setSelectCata1] = useState("select")
  const [editInput, setEditInput] = useState("")
  const [currentName, setCurrentName] = useState({})

  const [createCategory, { error: error2, data: data2 }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [

      { query: GET_ALL_CATEGORY }
    ],
  })

  const [updateCategory, { error: error3, data: data3 }] = useMutation(UPDATE_CATAEGORY, {
    refetchQueries: [
      { query: GET_ALL_CATEGORY }
    ]
  })


  const handleDivShow = () => {
    setCategory()
  }


  useEffect(() => {
    if (data) {

      let mostParentCategory = data?.getCategories?.result?.categories.filter(el => {
        return el.parent.name == "root"
      })
      setParentCategory(mostParentCategory)

      setMenus(data?.getCategories?.result?.categories)
    }
  }, [data])



  //console.log(parentCategory)


  const handleCreate = () => {
    if (categoryName && selectCata1 && selectCata1 != "select") {

      const name = categoryName.trim()
      createCategory({
        variables: {
          name: name,
          parentCategoryUid: selectCata1
        }

      }).then(res => {
        if (data2?.createCategory?.message) {
          alert(data2.createCategory.message)
          setCategoryName("")
        }
      }).catch(e => {
        if (error2) {
          console.log(error2)
          //alert(e)
        }
      })
    }
  }



  const handleUpdate = () => {
    if (editInput && editInput.length > 0 && currentName?.name && currentName.uid) {
      const name = editInput.trim()
      updateCategory({
        variables: {
          name,
          categoryUid: currentName.uid
        }

      })
        .then(res => {
          if (data3?.updateCategory?.message) {
            alert(data3.updateCategory.message)
            setCurrentName({})
            setEditInput("")
          }
        })

    }
  }






  const findDepth = (el) => {
    return menus.map(item => {
      if (el.uid == item.parent.uid) {
        return <>
          <span className={`margin-left border-left  ${el.name}  `} id={item.uid} onClick={(e) => {
            // e.stopPropagation()
            // setActive(el.uid)
          }


          }>
            <span>
              {`${item.name}`}
              <span className='margin-8'>
                <span onClick={() => {
                  setCurrentName({
                    name: item.name,
                    uid: item.uid
                  })
                  window.scroll(0, 0)
                }} >
                  <RiEdit2Fill />
                </span>
              </span>
            </span>


          </ span>
          <span className={` margin-left border-left  ${el.name}`}
            onClick={(e) => {
              // e.stopPropagation()
              // setActive(el.id)
            }


            }
          >
            {findDepth(item)}
          </span>
        </>
      }

    })
  }

  const show = parentCategory?.map(el => {
    return <span key={el.name} className={` margin-left  ${el.name}`} id={el.uid}
      onClick={(e) => {
        // e.stopPropagation()
        // setActive(el.id)
      }
      }
    >

      <span>
        {el.name}
        <span className='margin-8'>
          <span onClick={() => {
            setCurrentName({
              name: el.name,
              uid: el.uid
            })
            window.scroll(0, 0)
          }} >
            <RiEdit2Fill />
          </span>
        </span>
      </span>


      {findDepth(el)}
    </span>

  })






  if (loading) {
    return <div>loading...</div>
  }

  // console.log(parentCategory)
  //console.log(menus)

  return (
    <div className='flex-box'>
      <h1>Unlimited nested level</h1>
      <div className='edit-box'>
        <div>
          <h3>Edit</h3>
          <div>
            <span>
              <input type="text" onChange={(e) => setEditInput(e.target.value)} value={editInput} />
            </span>
            <span className='padding-both'>
              {
                currentName?.name?.length > 0 && currentName.name
              }

            </span>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
        <div>
          <h3>Create</h3>
          <div>
            <span>
              <input type="text" onChange={(e) => setCategoryName(e.target.value)} value={setCategoryName} />
            </span>
            <span>
              <select name="category" id="category" onChange={(e) => setSelectCata1(e.target.value)} value={selectCata1}>
                <option value="select">Select</option>
                {menus.map(el => {
                  return <>
                    <option value={el.uid} >{el.name}</option>
                  </>
                })}
              </select>
            </span>
            <button onClick={handleCreate}>Create</button>
          </div>

        </div>
      </div>
      <div className='main'>
        <div className='flex-box'>
          {
            show
          }

        </div>
      </div>
    </div>

  )
}

export default Megamenu