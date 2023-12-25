import { useState, useEffect } from 'react';
import './App.css';
import EditorSelector from './components/EditorSelector';
import EditorPro from './components/Editors/EditorPro';
import Layout from './components/Layout/Layout';
import EditorProMax from './components/Editors/EditorProMax';

function App() {
  const [editor, setEditor] = useState(null);

  return (
    <Layout>
      {
        editor != null ?
          <>
            <button className='btn btn-secondary' onClick={()=>setEditor(null)}>Go Back </button>
            {
              editor == 1 ?
                <EditorPro />
                :
                <EditorProMax />
            }
          </>
          :
          < EditorSelector setEditor={setEditor}></EditorSelector>
      }
    </Layout >
  );
}

export default App;
