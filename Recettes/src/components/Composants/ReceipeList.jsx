import ReceipCard from "../Composants/ReceipeCard.jsx";

export function ReceipList ({recipes}) {
    
    return (
       <>
       {recipes.map((r) => (
            <div>
              <ReceipCard recipe={r}/>
          </div>
          ))}
          </>
    )
}
export default ReceipCard;