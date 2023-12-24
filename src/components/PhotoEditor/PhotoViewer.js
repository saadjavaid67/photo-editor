import React, { useEffect, useState, useRef } from "react";
import styles from './index.module.css';

const PhotoViewer = ({ file, imageData, imageSize }) => {


    const canvasRef = useRef(null);
    useEffect(() => {
        // console.log(imageData);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }, [imageData])

    const downloadImage = () => {
        const canvas = canvasRef.current;
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "mzy_ka_h_na_:D.png";
        link.href = image;
        link.click();
    }

    const defaultImgConfigs = {
        scale: 1,
        transformX: 0,
        transformY: 0,
        rotate: 0,
    };
    const [imgConfigs, setImgConfigs] = useState(defaultImgConfigs);

    const [imgStyles, setImgStyles] = useState({
        transform: `scale(${imgConfigs.scale})`
    });

    useEffect(() => {
        setImgStyles({ transform: `scale(${imgConfigs.scale}) translate(${imgConfigs.transformY}px, ${imgConfigs.transformX}px) rotate(${imgConfigs.rotate}deg)` })
    }, [imgConfigs])

    const ZoomHandler = (i) => {
        let zoomVal = parseFloat(imgConfigs.scale + (i * 0.1));
        if (zoomVal >= 0.1) {

            setImgConfigs({ ...imgConfigs, scale: zoomVal });
        }
    }
    const PositionHandler = (x, y) => {
        let _x = parseFloat(imgConfigs.transformX + (x * 20));
        let _y = parseFloat(imgConfigs.transformY + (y * 20));

        setImgConfigs({ ...imgConfigs, transformX: _x, transformY: _y });

    }
    const RotateHandler = () => {
        setImgConfigs({ ...imgConfigs, rotate: ((imgConfigs.rotate + 45) % 360) });

    }
    const ResetHandler = () => {
        setImgConfigs(defaultImgConfigs);
    }
    return (
        <div className={styles.ImageWrapper}>
            <div className={styles.ToolsContainer}>
                <button onClick={(e) => ZoomHandler(1)} className="btn btn-success" title="Zoom-in">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                </button>
                <button onClick={(e) => ZoomHandler(-1)} className="btn btn-success" title="Zoom-out">
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                </button>
                <button onClick={() => PositionHandler(-1, 0)} className="btn btn-success" title="Up">
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button onClick={() => PositionHandler(1, 0)} className="btn btn-success" title="Down">
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
                <button onClick={() => PositionHandler(0, -1)} className="btn btn-success" title="Left">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button onClick={() => PositionHandler(0, 1)} className="btn btn-success" title="Right">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button onClick={() => RotateHandler()} className="btn btn-success" title="Rotate">
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button onClick={() => ResetHandler()} className="btn btn-success" title="Reset">
                    <i className="fa-solid fa-refresh"></i>
                </button>
                <button onClick={() => downloadImage()} className="btn btn-success" title="Download">
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
            <div className={styles.ImageContainer}>
                <canvas ref={canvasRef} style={imgStyles} width={imageSize.width} height={imageSize.height} />

            </div>
        </div>
    );
}

export default PhotoViewer;
