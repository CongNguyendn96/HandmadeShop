import React from 'react';
import { useDispatch } from 'react-redux';
import { selectItemVoucher } from '../../../redux/adminReducer/adminAction';

const ItemVoucher =({data,index}) => {
    const dispatch = useDispatch()
const selectItem =()=>{
   dispatch(selectItemVoucher({data:data,index:index}))
}
    return (
     <>
       {data && <div onClick={selectItem} className='item-voucher'>
            <h5></h5>
            <h5>{index} . {data.name}</h5>
            <h5>Expiry : <span> 
                {`${data.day_start.split(0,6)}/${data.day_final}`}
                </span></h5> 
        </div>}
     </>
    );
};


export default ItemVoucher;