import { UploadCloud } from "lucide-react";

const HeroImageUpload = ({ image, onImageChange, className = "" }) => {
  return (
    <div className={`hero-image-upload ${className}`}>
      {/* Conteneur de l'image */}
      <div
        className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => document.getElementById("hero-image-input").click()}
      >
        {/* Image de prévisualisation */}
        {image && (
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay sombre avec contenu */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
          {/* Icône */}
          <UploadCloud className="w-10 h-10 mb-3" />
          
          {/* Texte principal */}
          <p className="font-medium text-center mb-1">
            Glisser-déposer une nouvelle image pour la remplacer
          </p>
          
          {/* Texte secondaire (format) */}
          <p className="text-sm text-gray-200 text-center">
            Format recommandé : JPG ou PNG, min. 1920×1080px (Taille max: 8Mo)
          </p>
        </div>

        {/* Input caché */}
        <input
          id="hero-image-input"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </div>

      {/* Style supplémentaire pour améliorer l'apparence */}
      <style jsx global>{`
        .hero-image-upload .lucide-upload-cloud {
          color: white;
        }
        .hero-image-upload:hover .lucide-upload-cloud {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default HeroImageUpload;
