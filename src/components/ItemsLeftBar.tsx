const ItemsLeftBar: React.FC<{length: number}> = ({length}) => {

    //number of items to be displayed
    const itemsLeft = length === 1 ? <>{length} item left</> : <>{length} items left</>

    return (
        <>
            {itemsLeft}
        </>
    )
}

export default ItemsLeftBar;