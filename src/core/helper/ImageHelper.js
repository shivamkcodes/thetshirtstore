import React from 'react'
import { API } from '../../backend';


 const ImageHelper=({product})=> {
     
    
    let imageSrc;

    if(product._id!==undefined){
        imageSrc=`${API}/product/photo/${product._id}`
    }
    else{
        imageSrc="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }

    return (
        <div className="rounded border border-success p-2">
        <img
          src={imageSrc}
            alt="p"

          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded img-fluid"
        />
      </div>
    )
}

export default ImageHelper;
