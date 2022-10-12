import React, { useEffect } from "react";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ICONCLOSE } from "../../Icon";
import { GetSlideShow, PutSlideShow } from "../../redux/adminReducer/actionThunkAd/actionThunk";



const ModuleListSlider = ({ data, check, onclickClose, disForm, }) => {
  const [editSlider, setEditSlider] = useState(0)
  const dispatch = useDispatch()
  const dataSlider = useSelector(state => state.adminData.slideShow)

  const newlistSlide = useMemo(() => {
    const validData = dataSlider.findIndex(e => e.id === data.id)
    return (validData === -1 && editSlider === true) ? dataSlider.push(data) : dataSlider
  }, [dataSlider, data, editSlider])
  useEffect(() => {
    dispatch(GetSlideShow())
  }, [dispatch])
  const handleDeleteItemSlideShow = (event) => {
    setEditSlider(2)
    setTimeout(() => {
      setEditSlider(0)
      dispatch(PutSlideShow(dataSlider.filter(el => el.id !== event)))
    }, 500);
  }
  const handleSave = () => {
    console.log(dataSlider === newlistSlide)
    //  dispatch(PutSlideShow(newlistSlide))
  }
  return (
    <>
      {check && (
        <div className={`${disForm} module-list-slider `}>
          <div className="header-module-info">
            <i onClick={() => {
              onclickClose()
            }} className={ICONCLOSE}></i>
            <button style={{ backgroundColor: editSlider ? "blue" : "green" }} onClick={() => {
              if (editSlider === 0) {
                setEditSlider(1)
              } else {
                setEditSlider(2)
                setTimeout(() => {
                  setEditSlider(0)
                }, 500);
              }
            }}>Edit</button>
          </div>
          <div className="section">
            {dataSlider.length !== 0 && dataSlider.map((e, i) => {
              return (
                <div className="item-slider" key={i}>
                  <div className="img">
                    <img src={e.img} alt="" />
                  </div>
                  <div className="item-slider-detail">
                    <h6>{e.name}</h6>
                    <p>{e.price}</p>
                  </div>
                  {editSlider === 1 && <span onClick={() => { handleDeleteItemSlideShow(e.id) }} className={`buttonOn`} style={{ "--in": `${i / 26}s`, backgroundColor: "transparent" }}>
                    {/* <i className={ICONCLOSE}></i> */}
                    {i + 1}
                  </span>}
                  {editSlider === 2 && <span onClick={() => { handleDeleteItemSlideShow(e.id) }} className={`buttonOff`} style={{ "--in": `${i / 19}s`, backgroundColor: `red`, width: "30px", opacity: "1", visibility: "visible", color: "white" }}>
                    {/* <i className={ICONCLOSE}></i> */}
                    {i + 1}
                  </span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default ModuleListSlider;
