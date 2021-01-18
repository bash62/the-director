import './css/Spinner.css';

/**
 * Ce composant représente une icone signalant qu'une requête est entrain d'être effectuée.
 * ```html
 * <Spinner/>
 * ```
 */
const Spinner = () => {
  return(
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner;