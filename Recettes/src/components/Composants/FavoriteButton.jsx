import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export function FavoriteButton({ recipeId }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(recipeId)) {
            setIsFavorite(true);
        }
    }, [recipeId]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;
        
        if (isFavorite) {
            newFavorites = favorites.filter(favId => favId !== recipeId);
        } else {
            newFavorites = [...favorites, recipeId];
        }
        
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);

        
        // if(true === isFavorite){
        //     setIsFavorite(false);
        // }
        // if(false === isFavorite){
        //     setIsFavorite(true);
        // }
    };

    return (
        <button onClick={toggleFavorite} className={`favorite-button ${isFavorite ? 'favorite' : ''}`}>
            <Heart className="heart-icon" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
    );
}

export default FavoriteButton;
