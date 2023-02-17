declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
  >
  const src: string
  export default src
}

declare module '*.csv' {
  const src: string
  export default src
}