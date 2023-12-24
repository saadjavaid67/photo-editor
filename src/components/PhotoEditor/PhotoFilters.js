import React, { useState, useRef, useEffect } from 'react';
import styles from "./photo_filters.module.css"




const PhotoFilters = ({ file, setFile, filterHandler, imgData }) => {
    const defaultFilters = {
        contrast: 1,
        brightness: 0,
        power: 0,
        red: 0,
        green: 0,
        blue: 0,
        negative: 0,
    }

    const [filters, setFilters] = useState(defaultFilters);

    // const [contrast, setContrast] = useState(0);
    // const [red, setRed] = useState(0);
    // const [green, setGreen] = useState(0);
    // const [blue, setBlue] = useState(0);
    // const [negative, setNegative] = useState(0);


    useEffect(() => {
        let data = new Uint8ClampedArray(imgData.data);
        for (let i = 0; i < (imgData.width * imgData.height); i++) {
            // for (let j = 0; j < height; j++) {
            const offset = (i) * 4; // Each pixel takes up 4 array elements (RGBA)
            data[offset + 0] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (imgData.data[offset + 0]^parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.red) + (filters.negative == 1 ? 255 : 0); // Red channel
            data[offset + 1] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (imgData.data[offset + 1]^parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.green) + (filters.negative == 1 ? 255 : 0); // Green channel
            data[offset + 2] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (imgData.data[offset + 2]^parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.blue) + (filters.negative == 1 ? 255 : 0); // Blue channel
            data[offset + 3] = imgData.data[offset + 3]; // Alpha channel (fully opaque)
        }
        // }
        filterHandler(data)
    }, [filters])





    return (

        <div className={styles.FiltersWrapper}>


            <div className="row">
                <div className="col-6">

                    <h4>Filters</h4>
                </div>
                <div className="col-6 text-end">
                    <button onClick={() => setFilters(defaultFilters)} className="btn btn-success" title="Right">
                        <i className="fa-solid fa-refresh"></i> Reset
                    </button>
                </div>
            </div>
            <div className={styles.FiltersContainer}>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Brightness</label>
                    <label htmlFor="" className='form-label float-end'>{filters.brightness}</label>
                    <input type="range" className='form-range' name="" min={-100}  value={filters.brightness} onChange={e => setFilters({ ...filters, brightness: e.target.value })} max={100} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Red</label>
                    <label htmlFor="" className='form-label float-end'>{filters.red}</label>
                    <input type="range" className='form-range' name="" min={-255}  value={filters.red} onChange={e => setFilters({ ...filters, red: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Green</label>
                    <label htmlFor="" className='form-label float-end'>{filters.green}</label>
                    <input type="range" className='form-range' name="" min={-255}  value={filters.green} onChange={e => setFilters({ ...filters, green: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Blue</label>
                    <label htmlFor="" className='form-label float-end'>{filters.blue}</label>
                    <input type="range" className='form-range' name="" min={-255}  value={filters.blue} onChange={e => setFilters({ ...filters, blue: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Power Law</label>
                    <label htmlFor="" className='form-label float-end'>{filters.power}</label>
                    <input type="range" className='form-range' name="" min={0}  value={filters.power} onChange={e => setFilters({ ...filters, power: e.target.value })} max={100}  id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Contrast</label>
                    <label htmlFor="" className='form-label float-end'>{filters.contrast}</label>
                    <input type="range" className='form-range' name="" min={1}  value={filters.contrast} onChange={e => setFilters({ ...filters, contrast: e.target.value })} max={10} step={0.1} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Negative</label>
                    <label htmlFor="" className='form-label float-end'>{filters.negative}</label>
                    <input type="range" className='form-range' name="" min={0}  value={filters.negative} onChange={e => setFilters({ ...filters, negative: e.target.value })} max={1} id="" />
                </div>
            </div>
        </div>
    );
}

export default PhotoFilters;
