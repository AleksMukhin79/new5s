import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Image from "../image.jsx";

//import { AppContext } from "../App.js";
import { useParams } from "react-router-dom";

function ViolationData() {
  let depname;
  let coordinates;
  let description;
  const { id } = useParams();

  const [itemsDetail, setItemsDetail] = React.useState([]);

  const itemData = itemsDetail.reduce((acc, item) => {
    const data = {
      ...item,
      depname: item.viola.dep.name,
      img: item.url_foto,
      title: item.description,
      coordinates: item.viola.coordinates,
      description: item.viola.description,
    };
    return [...acc, data];
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:8080/violadb/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItemsDetail(json);
      });
  }, []);

  if (itemData.length) {
    depname = itemData[0].depname;
    coordinates = itemData[0].coordinates;
    description = itemData[0].description;
  }

  return (
    <div className="content p-40">
      <div className="headerInfo">
        <p className="text-uppercase">{depname}</p>
        <p className="opacity-5">координаты: {coordinates}</p>
        <p className="opacity-5">описание: {description}</p>
      </div>

      <ImageList sx={{ width: 950, height: 450 }}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <Image
              src={`${item.img}?w=248&fit=crop&auto=format`}
              zoom={true}
            ></Image>

            {/*<img src={`${item.img}?w=248&fit=crop&auto=format`}></img> */}
            <ImageListItemBar position="below" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
export default ViolationData;
