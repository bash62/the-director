import React from 'react'


import './css/FourOFour.css'

/**
 * Ce composant représente la page affichée quand un url invalide est entré.
 */
const FourOFour= () => {

    return(
        <div className="section">
            <div className='fourOFour'>
                <h1>4</h1>
                <img alt='' src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=UpDown&mouthType=Serious&skinColor=Brown"></img>
                <h1>4</h1>
            </div>
            <div className="texte">La page recherchée est introuvable...</div>
            <div>
            </div>
        </div>
    )
}

export default FourOFour