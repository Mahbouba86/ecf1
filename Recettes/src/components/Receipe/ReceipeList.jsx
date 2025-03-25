import ReceipCard from "./ReceipeCard";

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