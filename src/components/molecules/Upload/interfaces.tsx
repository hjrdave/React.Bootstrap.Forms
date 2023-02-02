export default interface IFile {
    path: string,
    lastModified: Date,
    lastModifiedDate: Date,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string
}