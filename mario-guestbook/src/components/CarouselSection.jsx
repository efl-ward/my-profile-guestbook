import { useState } from 'react';

export default function CarouselSection({ title, photos, icon = '📸' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Keyboard navigation (optional)
  const handleKeyDown = (e) => {
    if (!showModal) return;
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'Escape') closeModal();
  };

  if (photos.length === 0) return null;

  return (
    <>
      <div className="panel carousel-section">
        <div className="panel-title">{icon} {title}</div>
        <div className="photo-carousel">
          <button className="carousel-btn" onClick={goPrev}>◀</button>
          <div className="carousel-image-container" onClick={openModal}>
            <img 
              src={photos[currentIndex].url} 
              alt={photos[currentIndex].title || title}
              className="carousel-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=Image+not+found';
              }}
            />
          </div>
          <button className="carousel-btn" onClick={goNext}>▶</button>
        </div>
        <div className="photo-counter">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Full‑screen modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <button className="modal-prev" onClick={goPrev}>◀</button>
            <img 
              src={photos[currentIndex].url} 
              alt={photos[currentIndex].title || title}
              className="modal-image"
            />
            <button className="modal-next" onClick={goNext}>▶</button>
            <div className="modal-counter">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}