const getBreadcrumbs = (pathname: string) => {
    const pathParts = pathname.split('/').filter(part => part)
    let currentPath = ''

    const breadcrumbs = pathParts.map(part => {
        const label = part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' ')
        currentPath += `/${part}`
        return { label, path: currentPath }
    })
    return [{ label: 'Home', path: '/' }, ...breadcrumbs]
}

export default getBreadcrumbs