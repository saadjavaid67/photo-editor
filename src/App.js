import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import PhotoViewer from './components/PhotoEditor/PhotoViewer';
import PhotoFilters from './components/PhotoEditor/PhotoFilters';
import { useEffect, useState } from 'react';
import ImageParser from 'react-image-parser';


function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [orignalImage, setOrignalImage] = useState();
  const [imageData, setImageData] = useState({
    height: 0,
    width: 0,
    data: null
  });

  function handleChange(e) {
    let img = URL.createObjectURL(e.target.files[0]);
    setFile(img)
  }

  useEffect(() => {
    if (imageData.data) {
      const newImage = new ImageData(imageData.data, imageData.width, imageData.height);
      setImage(newImage)
    }
  }, [imageData])



  const onImageParsed = ({ data, size }) => {
   setOrignalImage(data)
    setImageData({
      height: size.height,
      width: size.width,
      data: data
    });
    // updateImage(data)
  };

  const filterHandler = (data) => {
    setImageData({
      ...imageData,
      data: data
    })
  }

  return (
    <Layout>
      {file ?

        (
          <div className=" mt-2">
            <ImageParser
              img={file}
              onImageParsed={onImageParsed}
            />
            {image &&
              <div className="row">
                <div className="col-md-6">
                  <PhotoViewer file={file} imageData={image} imageSize={{ height: imageData.height, width: imageData.width }}></PhotoViewer>
                </div>
                <div className="col-md-6">
                  <PhotoFilters file={file} setFile={setFile} filterHandler={filterHandler} imgData={{ width: imageData.width, height: imageData.height, data: orignalImage }}></PhotoFilters>
                </div>
              </div>
            }
          </div>
        ) :
        (<div className="my-4 d-flex flex-column justify-content-center">
          <span className="fw-bold me-2">Select your image:</span>
          <input type="file" onChange={handleChange} />
        </div>)
      }

    </Layout>
  );
}

export default App;
