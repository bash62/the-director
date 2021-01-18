import './css/Arrow.css';

/**
 * Ce composant affiche une flèche animée qui pointe vers la gauche.
 * Exemple :
 * ```html
 * <Arrow />
 * ```
 */
const Arrow = () => {
  return <>
    <div class="arrow">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </>
}

export default Arrow;