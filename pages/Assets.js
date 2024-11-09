import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssetForm from '../components/Assetform';
import '../styles/Assets.css';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    axios.get('/api/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  const handleCreateAsset = (assetData) => {
    axios.post('/api/assets', assetData)
      .then(response => setAssets([...assets, response.data]))
      .catch(error => console.error('Error creating asset:', error));
  };

  return (
    <div className="assets-page">
      <h2>Assets</h2>
      <AssetForm onSubmit={handleCreateAsset} />
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>{asset.name} - {asset.serial}</li>
        ))}
      </ul>
    </div>
  );
}

export default Assets;
