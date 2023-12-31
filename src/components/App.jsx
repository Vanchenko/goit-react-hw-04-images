import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { loadImagesPixabay } from 'api/api';
import css from './App.module.css';

const PER_PAGE = 12;

export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);



  useEffect(() => {
    if (searchWord !=='') {
      setIsLoading(true);
      setShowMoreBtn(false);
      loadImagesPixabay(searchWord.split('/')[1], page)
        .then(resp => {
          if (resp.length === 0) {
            setIsEmpty(true);
            setIsLoading(false);
            setShowMoreBtn(false);
            return;
          }
          setImages(prevState => [...prevState, ...resp]);
          if (resp.length >= PER_PAGE) {
            setShowMoreBtn(true);
          }
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchWord, page]);

  const onSubmit = evt => {
    evt.preventDefault();
    const sw = evt.target.elements[1].value;
    if (sw !== '') {
      setSearchWord(`${Date.now()}/${sw}`);
      setPage(1);
      setImages([]);
      setShowModal(false);
      setBigImage('');
      setIsLoading(false);
      setIsEmpty(false);
    };
  };

  const onLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };
  const onImageClick = evt => {
    setShowModal(true);
    setBigImage( evt.target.dataset.bigimg );
  };
  const onCloseModal = () => {
    setShowModal(false);
};
  
return (
      <div className={css.App}>
        <Searchbar SearchOnSubmit={onSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass={css.wrapperClass}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {isEmpty && (
          <p className={css.messageIsEmpty}>
            Sorry. There are no images ... 😭
          </p>
        )}
        {showMoreBtn && <Button onLoadMore={onLoadMore} />}
        {showModal && (
          <Modal onClose={onCloseModal} bigImage={bigImage}></Modal>
        )}
      </div>
    );
}

