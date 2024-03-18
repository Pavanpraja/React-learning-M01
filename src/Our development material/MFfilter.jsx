import { useEffect, useState } from "react";

const API = "/mfdata.json";

const MFfilter = ({title}) => {
    const [store, setStore] = useState({gender: ""});
    const [mfdata, setMfdata] = useState([])
  const fetchData = async (url) => {
    try {
      const fetchAPI = await fetch(url);
      const jsonformat = await fetchAPI.json();
      setMfdata(jsonformat)
      // b.map((data)=>{
        //     return setStore(data.name)
        // })
      } catch (error) {
        console.error(error);
      }
    };
    const changeData = (e) => {
      const {name, value} = e.target;
      setStore((prevdata)=> ({...prevdata, [name] : value}));
      const boat = mfdata.peoples.filter((item)=>{
        const genderFilter = store.gender ? item.age === parseInt(store.gender) : true;
        return genderFilter;
      })
      return boat
      // console.log(boat)

  };
  useEffect(() => {
    fetchData(API);
  }, []);
  return (
    <div>
    <h1>{title}</h1>
      <select
        name="change"
        id="change"
        value={store.gender}
        onChange={changeData}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {/* {store ? store.map((data, index) => {
        return <p key={index}>{data.name}</p>
      }) : null} */}
      {boat.map((item, index)=>{
        return <p key={index}>{item.name}</p>
      })}
    </div>
  )
}
MFfilter.propTypes
export default MFfilter
