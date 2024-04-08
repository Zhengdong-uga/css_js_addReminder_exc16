import styles from './Problem2.module.css'
// Will do in class
// Covers CSS Modules Stylesheet: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
// @todo the second div needs to get a 'problem2style' as a generated class from the CSS module, not
//.  regular CSS styling.
const Problem2 = () => {
  console.log('STYLES', styles);
  return (
    <>
      <div className='problem1style'>I was hoping I wouldn't get the style from problem 1, but I guess Ben wants to make a point here.</div>
      <div className={styles.problem2style}>Me? I have the class `problem2style` and should styled. Problem 1 also has a div with `problem2style` but shouldn't get styled. CSS modules let us do that!</div>
    </>)
}

export default Problem2;
