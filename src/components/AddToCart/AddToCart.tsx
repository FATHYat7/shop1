"use client"
import { useState } from 'react'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'
import { HeartIcon, Loader, Loader2, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
// import { ProductI } from '@/interfaces/product'

export default function AddToCart({productId}:{productId:string}) {
const [isLoading,setsLoading]=useState(false)




async function addProductToCart() {
 setsLoading(true)
 const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
   method:"POST",
   body:JSON.stringify({productId}),
   headers:{
     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBlYzU4ZWI1ZDAyMDE2ZjdhZjQ2NyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MjkzODcxLCJleHAiOjE3NjYwNjk4NzF9.8G8eXLPaPDe-0v_zcV7QDBAAbVYiedBi4a4g_ZR25T8',
     "Content-Type" :"application/json"
    }
  });
  const data= await response.json();


data.status = 'success' && toast.success(data.message)



  setsLoading(false)

console.log(data);

}













  return <>
   <CardFooter className="gap-2">
              <Button disabled={isLoading} onClick={addProductToCart} className="flex-1">
               {isLoading? <Loader2 className='animate-spin'/> :
               <ShoppingCartIcon/>}
                Add to cart
              </Button>
              <Button variant="outline" size="icon">
                <HeartIcon className="h-5 w-5" />
              </Button>
            </CardFooter>
  
  
  </>
}
