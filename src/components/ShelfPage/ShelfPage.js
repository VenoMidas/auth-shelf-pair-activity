import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [description, setDescription] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  };

  const addToShelf = (event) => {
    event.preventDefault(); // stops page refresh on submit
    axios.post('/api/shelf', { description: description, image_url: imgUrl }).then(() => {
      fetchShelf();
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  };

  const deleteShelfItem = (shelfItemId) => {
    console.log('in delete shelf item')
    axios.delete(`/api/shelf/${shelfItemId}`).then(() => {
      fetchShelf();
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong');
    });
  };

  return (
    <div className="container">
      <h2>Add an item to the shelf</h2>
      <form onSubmit={addToShelf}>
        <label>Description</label>
        <input value={description} onChange={(event) => setDescription(event.target.value)} type="text" />
        <br />
        <label>Image URL</label>
        <input value={imgUrl} onChange={(event) => setImgUrl(event.target.value)} type="text" />
        <br />
        <input type="submit" />
      </form>

      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
            <div className="gallery">
              <img src={item.image_url} alt={item.description} />
              <br />
              <div className="desc">{item.description}</div>
              <div style={{ textAlign: 'center', padding: '5px' }}>
                <button onClick={() => deleteShelfItem(item.id)} style={{ cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
