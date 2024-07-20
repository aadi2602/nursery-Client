import axios from 'axios';
import React, {useEffect, useState} from 'react'
import toast, {Toaster} from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom'

function UpdatePlant() {
  const { id } = useParams();

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const updatePlant = async ()=>{
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/plant/${id}`, {
      name: name,
      price: price,
      description: description,
      category: category,
      image: image
    })

    toast.success(response.data.message)
  }

  const loadPlant = async(id)=>{
    if(!id){
      return
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/plant/${id}`)

    const {name, image, price, category, description} = response.data.data

    setName(name)
    setImage(image)
    setCategory(category)
    setDescription(description)
    setPrice(price)
  }

  useEffect(()=>{
      loadPlant(id)
  }, [id])


  return (
    <div>
      <h1>Update Plant: {id}</h1>

      <form>

        <input
          type='text'
          placeholder='Enter plant name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='plant-input'
        />

        <input
          type='number'
          placeholder='Enter plant price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='plant-input'
        />

        <input
          type='text'
          placeholder='Enter plant category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='plant-input'
        />

        <img src={image} alt='' className='img-preview' />

        <input
          type='text'
          placeholder='Enter plant image url'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='plant-input'
        />

        <input
          type='text'
          placeholder='Enter plant description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='plant-input'
        />

        <button type='button' onClick={updatePlant}>Update Plant</button>
      </form>
      
      <br />  <br />
      <Link to="/">Show All Plants</Link>

      <Toaster />
    </div>
  )
}

export default UpdatePlant