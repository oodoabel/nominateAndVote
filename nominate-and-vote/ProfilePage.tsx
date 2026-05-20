import React, { useState, useEffect, useRef } from "react";

// Define props for the ProfilePage component
interface ProfilePageProps {
  profileImageUrl: string;
  altText: string;
}

// Simple Modal component for displaying the full-size image
interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  altText,
  onClose,
}) => {
  if (!isOpen || !imageUrl) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease-out",
        cursor: "zoom-out",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Full size image of ${altText}`}
      onClick={onClose} // Close modal when clicking outside the image
    >
      {/* CSS Styles for seamless animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <div
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on the image itself
      >
        <img
          src={imageUrl}
          alt={`Full size ${altText}`}
          style={{
            maxWidth: "100%",
            maxHeight: "75vh",
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Caption */}
        <div style={{ marginTop: "16px", textAlign: "center", color: "white" }}>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: "600", letterSpacing: "0.5px" }}>
            {altText}
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-45px",
            right: "0px",
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "14px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
          aria-label="Close full size image"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  profileImageUrl,
  altText,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fullSizeImageUrl, setFullSizeImageUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    setFullSizeImageUrl(profileImageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFullSizeImageUrl(null);
  };

  // Keyboard Escape Key closing handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>
      <div
        style={{
          cursor: "zoom-in",
          width: "150px",
          height: "150px",
          overflow: "hidden",
          borderRadius: "50%",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          border: "4px solid white",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
        }}
      >
        <img
          src={profileImageUrl}
          alt={altText}
          onClick={handleImageClick}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <p>Welcome to your profile page!</p>

      <ImageModal
        isOpen={isModalOpen}
        imageUrl={fullSizeImageUrl}
        altText={altText}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProfilePage;

// Example usage in another component (e.g., App.tsx)
/*
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div className="App">
      <ProfilePage
        profileImageUrl="https://via.placeholder.com/150/FF0000/FFFFFF?text=Profile"
        altText="User Profile Picture"
      />
    </div>
  );
}

export default App;
*/
