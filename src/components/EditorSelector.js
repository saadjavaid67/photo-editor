import React from 'react';

const EditorSelector = ({setEditor}) => {
    return (
        <div>
            <div className="container">
                <h1 className='text-center'>Go with the one that sparks your chemistry.</h1>
                <div className="row">
                    <div className="col-md-6 mb-2 text-center">
                        <button onClick={()=>setEditor(1)} className=" btn btn-primary w-100 fs-1 py-4">
                            Editor Pro
                        </button>
                    </div>
                    <div className="col-md-6 mb-2 text-center">
                        <button onClick={()=>setEditor(2)} className=" btn btn-success w-100 fs-1 py-4">
                            Editor Pro Max
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditorSelector;
