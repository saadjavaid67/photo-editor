import React from 'react';
import image_saad from './../assets/saad.jpeg'
import image_female from './../assets/female.png'

const EditorSelector = ({ setEditor }) => {
    return (
        <div>
            <div className="container">
                <h1 className='text-center'>Go with the one that sparks your chemistry.</h1>
                <div className="row">
                    <div className="col-md-6 mb-2 text-center">
                        <button onClick={() => setEditor(1)} className=" btn btn-primary w-100 fs-1 py-4">
                            Editor Pro
                        </button>
                    </div>
                    <div className="col-md-6 mb-2 text-center">
                        <button onClick={() => setEditor(2)} className=" btn btn-success w-100 fs-1 py-4">
                            Editor Pro Max
                        </button>
                    </div>
                </div>
                <h1 className='text-center mt-5 pt-5'>Behind the Curtain: The Brilliant Minds Crafting Magic</h1>
                <div className="row justify-content-center">

                    <div className="col-md-2 col-6 mb-2 text-center">
                        <div className="card overflow-hidden rounded-4 h-100">
                            <div className="card-body justify-content-between d-flex flex-column p-0 pb-2">
                                <img src={image_female} className='mw-100' alt="" />
                                <div>
                                    <h6 className='m-0 mt-3'>Eman Fatima</h6>
                                    <div className='text-muted'>01-134202-018</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-6 mb-2 text-center">
                        <div className="card overflow-hidden rounded-4 h-100">
                            <div className="card-body justify-content-between d-flex flex-column p-0 pb-2">
                                <img src={image_female} className='mw-100' alt="" />
                                <div>
                                    <h6 className='m-0 mt-3'>Bisma Qamar</h6>
                                    <div className='text-muted'>01-134202-073</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-6 mb-2 text-center">
                        <div className="card overflow-hidden rounded-4 h-100">
                            <div className="card-body justify-content-between d-flex flex-column p-0 pb-2">
                                <img src={image_female} className='mw-100' alt="" />
                                <div>
                                    <h6 className='m-0 mt-3'>Zuhaa</h6>
                                    <div className='text-muted'>01-134202-104</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-6 mb-2 text-center">
                        <div className="card overflow-hidden rounded-4 h-100 ">
                            <div className="card-body justify-content-between d-flex flex-column p-0 pb-2">
                                <img src={image_saad} className='mw-100' alt="" />
                                <div>
                                    <h6 className='m-0 mt-3'>Muhammad Saad</h6>
                                    <div className='text-muted'>01-134202-116</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default EditorSelector;
