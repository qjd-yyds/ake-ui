import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

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
					console.log(index);
				}}
			>
				<MenuItem disabled index={1}>
					1
				</MenuItem>
				<MenuItem index={2}>2</MenuItem>
				<MenuItem index={3}>3</MenuItem>
				<MenuItem index={4}>4</MenuItem>
			</Menu>
			<hr />
			<Menu
				mode="vertical"
				onSelect={index => {
					console.log(index);
				}}
			>
				<MenuItem disabled index={1}>
					1
				</MenuItem>
				<MenuItem index={2}>2</MenuItem>
				<MenuItem index={3}>3</MenuItem>
				<MenuItem index={4}>4</MenuItem>
			</Menu>
		</div>
	);
}

export default App;
