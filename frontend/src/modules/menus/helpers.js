import menuService from "./service";

export const handleSave = async ({ menu, setMessage, setReload }) => {
    try {
        const { data: { menu: createdMenu } } = await menuService.create(menu)
        setReload(true)

        setMessage('Menu created')
    } catch (e) {
        console.log(e)
        setMessage('Error creating menu')
    }
}

export const handleEdit = async ({ menu, setMessage, setReload }) => {
    try {
        const { data: { menu: updatedMenu } } = await menuService.edit(menu._id, menu)
        setReload(true)

        setMessage('Menu updated')
    } catch (e) {
        console.log(e)
        setMessage('Error editing menu')
    }
}

export const handleDelete = async ({ menu, setMenu, setIsFormOpen, setMessage, setReload }) => {
    try {
        await menuService.delete(menu._id)
        setMenu({})
        setIsFormOpen(false)
        setReload(true)

        setMessage('Menu deleted')
    } catch (e) {
        setMessage('Error deleting menu')
    }
}