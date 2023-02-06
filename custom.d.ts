/* Custom typescript type declarations*/

// declare module "*.svg" {
//     const content: any;
//     export default content;
// }
// declare module "*.png" {
//     const content: any;
//     export default content;
// }

// declare module "react-bootstrap-time-picker" {
//     const content: any;
//     export default content
// }


declare module "@fortawesome/fontawesome-free" {
    function FontAwesomeIcon(props: { icon: string }): JSX.Element;
    export default FontAwesomeIcon;
}
declare module "*.scss" {
    const styles: { [className: string]: string };
    export default styles;
}