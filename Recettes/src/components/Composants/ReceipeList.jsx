import ReceipCard from "../Composants/ReceipeCard.jsx";

export function ReceipList ({recipes}) {
    
    return (
       <>
      {recipes.map((r) => (
  <div key={r.id}>
    <ReceipCard recipe={r} />
  </div>
          ))}
          </>
    )
}
export default ReceipList;