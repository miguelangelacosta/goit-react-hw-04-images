import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

const API_KEY = '38758233-8fc35b3d0bfcc58c4cf74e0b5';
const BASE_URL = 'https://pixabay.com/api/';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    fetchImages(newQuery, 1);
  };

  const fetchImages = (query, page) => {
    setIsLoading(true);
    axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=vertical&per_page=12`)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setPage(page);
      })
      .catch(error => {
        console.error('Error obtaining images:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchImages(query, nextPage);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {!!images.length && !isLoading && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
