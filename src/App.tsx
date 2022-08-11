import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
	return (
		<div className="App">
			<h4>button组件</h4>
			<Button btnType="danger">Danger</Button>
			<Button>Default</Button>
			<Button btnType="link" href="http://www.baidu.com">
				Link
			</Button>
			<Button btnType="primary">Primary</Button>
			<hr />
			<Button btnType="danger" disabled>
				Danger
			</Button>
			<Button disabled>Default disabled</Button>
			<Button disabled btnType="link" href="http://www.baidu.com">
				Link disabled
			</Button>
			<Button disabled btnType="primary">
				Primary disabled
			</Button>
			<hr />
			<Button size="lg" btnType="primary">
				Large
			</Button>
			<Button btnType="danger">normal</Button>
			<Button size="sm">small</Button>
			<hr />
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
			<hr />
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
		</div>
	);
}

export default App;
