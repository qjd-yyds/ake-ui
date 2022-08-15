import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

export default function Example() {
    return <>
        <h4>menu组件</h4>
        <Menu
            onSelect={index => {
                alert(index);
            }}
        >
            <MenuItem disabled index="a">
                1
            </MenuItem>
            <MenuItem index="b">2</MenuItem>
            <SubMenu title="大家好">
                <MenuItem>3</MenuItem>
                <MenuItem>4</MenuItem>
            </SubMenu>
        </Menu>
        <hr/>
        <Menu
            mode="vertical"
            onSelect={index => {
                alert(index);
            }}
        >
            <MenuItem disabled>1</MenuItem>
            <MenuItem>2</MenuItem>
            <SubMenu title="大家好">
                <MenuItem>3</MenuItem>
                <MenuItem>4</MenuItem>
            </SubMenu>
        </Menu>
    </>
}