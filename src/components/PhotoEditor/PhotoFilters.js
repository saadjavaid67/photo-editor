import React, { useState, useRef, useEffect } from 'react';
import styles from "./photo_filters.module.css"




const PhotoFilters = ({ file, setFile, filterHandler, imgData }) => {
    const defaultFilters = {
        contrast: 1,
        opacity: 100,
        brightness: 0,
        power: 0,
        red: 0,
        green: 0,
        blue: 0,
        negative: 0,
        bw: 0,
        blur: 0,
    }

    const [filters, setFilters] = useState(defaultFilters);
    const [tempFilters, setTempFilters] = useState(defaultFilters);

    // const [contrast, setContrast] = useState(0);
    // const [red, setRed] = useState(0);
    // const [green, setGreen] = useState(0);
    // const [blue, setBlue] = useState(0);
    // const [negative, setNegative] = useState(0);

    const blurHandler = (data) => {
        const kernel = [
            1, 4, 6, 4, 1,
            4, 16, 24, 16, 4,
            6, 24, 36, 24, 6,
            4, 16, 24, 16, 4,
            1, 4, 6, 4, 1
        ];

        const kernelWeight = kernel.reduce((a, b) => a + b, 0);

        for (let index = 0; index < filters.blur; index++) {
            for (let i = 2; i < imgData.height - 2; i++) {
                for (let j = 2; j < imgData.width - 2; j++) {
                    let sumRed = 0,
                        sumGreen = 0,
                        sumBlue = 0;

                    // Modify kernel weights based on pixel intensity compared to the threshold


                    for (let ky = -2; ky <= 2; ky++) {
                        for (let kx = -2; kx <= 2; kx++) {
                            const idx = ((i + ky) * imgData.width + (j + kx)) * 4;
                            const weight = kernel[(ky + 2) * 5 + (kx + 2)]
                            sumRed += (data[idx] * weight);
                            sumGreen += (data[idx + 1] * weight);
                            sumBlue += (data[idx + 2] * weight);
                        }
                    }

                    const pixelIndex = (i * imgData.width + j) * 4;

                    data[pixelIndex] = parseFloat(sumRed / kernelWeight);
                    data[pixelIndex + 1] = parseFloat(sumGreen / kernelWeight);
                    data[pixelIndex + 2] = parseFloat(sumBlue / kernelWeight);
                    data[pixelIndex + 3] = (data[pixelIndex + 3]);
                }
            }
        }
        console.log(data);
    }


    useEffect(() => {
        let data = new Uint8ClampedArray(imgData.data);
        for (let i = 0; i < (imgData.width * imgData.height); i++) {
            // for (let j = 0; j < imgData.height; j++) {
            const offset = (i) * 4; // Each pixel takes up 4 array elements (RGBA)
            data[offset + 0] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (((filters.bw == 0) ? (imgData.data[offset + 0]) : (parseInt(imgData.data[offset + 0] > (filters.bw * 2.55) ? 0 : 255))) ^ parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.red) + (filters.negative == 1 ? 255 : 0); // Red channel
            data[offset + 1] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (((filters.bw == 0) ? (imgData.data[offset + 1]) : (parseInt(imgData.data[offset + 1] > (filters.bw * 2.55) ? 0 : 255))) ^ parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.green) + (filters.negative == 1 ? 255 : 0); // Green channel
            data[offset + 2] = (filters.negative == 1 ? -1 : 1) * parseInt(filters.contrast) * (((filters.bw == 0) ? (imgData.data[offset + 2]) : (parseInt(imgData.data[offset + 2] > (filters.bw * 2.55) ? 0 : 255))) ^ parseFloat(filters.power)) + parseInt(filters.brightness) + parseInt(filters.blue) + (filters.negative == 1 ? 255 : 0); // Blue channel
            data[offset + 3] = parseInt(parseFloat(imgData.data[offset + 3] / 100) * parseInt(filters.opacity)); // Alpha channel (fully opaque)
        }
        // console.log(data[i+3]);
        // }

        blurHandler(data)
        filterHandler(data)
    }, [filters])



    return (

        <div className={styles.FiltersWrapper}>


            <div className="row">
                <div className="col-6">

                    <h4>Filters</h4>
                </div>
                <div className="col-6 text-end">
                    <button onTouchStart={() => {setTempFilters(filters);setFilters(defaultFilters)} } onMouseDown={() => {setTempFilters(filters);setFilters(defaultFilters)} } onMouseUp={() => setFilters(tempFilters)} onTouchEnd={() => setFilters(tempFilters)}  className="btn btn-sm btn-success me-2" title="Right">
                    <i class="fa-solid fa-code-compare"></i> <span className='d-none d-md-block'>Compare</span>
                    </button>
                    <button onClick={() => setFilters(defaultFilters)} className="btn btn-success btn-sm" title="Right">
                        <i className="fa-solid fa-refresh"></i> <span className='d-none d-md-block'>Reset</span>
                    </button>
                </div>
            </div>
            <div className={styles.FiltersContainer}>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Brightness</label>
                    <label htmlFor="" className='form-label float-end'>{filters.brightness}</label>
                    <input type="range" className='form-range' name="" min={-100} value={filters.brightness} onChange={e => setFilters({ ...filters, brightness: e.target.value })} max={100} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Red</label>
                    <label htmlFor="" className='form-label float-end'>{filters.red}</label>
                    <input type="range" className='form-range' name="" min={-255} value={filters.red} onChange={e => setFilters({ ...filters, red: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Green</label>
                    <label htmlFor="" className='form-label float-end'>{filters.green}</label>
                    <input type="range" className='form-range' name="" min={-255} value={filters.green} onChange={e => setFilters({ ...filters, green: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Blue</label>
                    <label htmlFor="" className='form-label float-end'>{filters.blue}</label>
                    <input type="range" className='form-range' name="" min={-255} value={filters.blue} onChange={e => setFilters({ ...filters, blue: e.target.value })} max={255} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>B/W</label>
                    <label htmlFor="" className='form-label float-end'>{filters.bw}</label>
                    <input type="range" className='form-range' name="" min={0} value={filters.bw} onChange={e => setFilters({ ...filters, bw: e.target.value })} max={100} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Opacity</label>
                    <label htmlFor="" className='form-label float-end'>{filters.opacity}</label>
                    <input type="range" className='form-range' name="" min={0} value={filters.opacity} onChange={e => setFilters({ ...filters, opacity: e.target.value })} max={100} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Gaussian Blur</label>
                    <label htmlFor="" className='form-label float-end'>{filters.blur}</label>
                    <input type="range" className='form-range' name="" min={0} value={filters.blur} onChange={e => setFilters({ ...filters, blur: e.target.value })} max={10} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Power Law</label>
                    <label htmlFor="" className='form-label float-end'>{filters.power}</label>
                    <input type="range" className='form-range' name="" min={0} value={filters.power} onChange={e => setFilters({ ...filters, power: e.target.value })} max={100} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Contrast</label>
                    <label htmlFor="" className='form-label float-end'>{filters.contrast}</label>
                    <input type="range" className='form-range' name="" min={1} value={filters.contrast} onChange={e => setFilters({ ...filters, contrast: e.target.value })} max={10} step={0.1} id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Negative</label>
                    <label htmlFor="" className='form-label float-end'>{filters.negative}</label>
                    <input type="range" className='form-range' name="" min={0} value={filters.negative} onChange={e => setFilters({ ...filters, negative: e.target.value })} max={1} id="" />
                </div>
            </div>
        </div>
    );
}

export default PhotoFilters;
