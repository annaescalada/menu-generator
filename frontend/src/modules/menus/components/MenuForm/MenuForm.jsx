import React from 'react'
import _ from 'lodash'
import { Button, Paper } from '@material-ui/core'

import TextInput from '../../../../components/shared/TextInput'
import SelectInput from '../../../../components/shared/SelectInput'
import { useStyles } from './styles';
import ComplexIngredients from './components/ComplexIngredients/ComplexIngredients';
import TopButtons from './components/TopButtons';
import Veggies from './components/Veggies/Veggies';
import MenuGrid from './components/MenuGrid';
import { useMenuChange } from './hooks';

const MenuForm = ({ menu, setMenu, handleClick, enums = [], error, allIngredients, allRecipes, setSelectedRecipes }) => {
    const classes = useStyles()
    const [ingredientsOptions, recipesOptions] = useMenuChange(menu, allIngredients, allRecipes, setSelectedRecipes)

    return <Paper className={classes.container}>
        <TopButtons />
        <TextInput
            label="Name"
            value={menu.name}
            onChange={(v) => setMenu(prev => ({ ...prev, name: v }))}
            required
            error={error && !menu.name}
        />
        <SelectInput
            label="Season"
            multiple
            value={menu.season || []}
            onChange={(v) => setMenu(prev => ({ ...prev, season: v }))}
            required
            options={enums.seasonEnum}
        />
        <SelectInput
            label="Tags to include"
            multiple
            value={menu.toIncludeTags || []}
            onChange={(v) => setMenu(prev => ({ ...prev, toIncludeTags: v }))}
            options={enums.inclusiveTags}
        />
        <SelectInput
            label="Tags to exclude"
            multiple
            value={menu.toExcludeTags || []}
            onChange={(v) => setMenu(prev => ({ ...prev, toExcludeTags: v }))}
            options={enums.exclusiveTags}
        />
        <div className={classes.chipContainer}>
            <ComplexIngredients menu={menu} />
            <Veggies  menu={menu} />
        </div>
        <MenuGrid
            menu={menu}
            setMenu={setMenu}
            enums={enums}
            ingredientsOptions={ingredientsOptions}
            recipesOptions={recipesOptions}
        />
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper>
}

export default MenuForm

