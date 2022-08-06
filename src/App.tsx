import Button from './components/Button/button';

function App() {
	return (
		<div className="App">
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
			<Button size="lg" btnType="primary">Large</Button>
			<Button btnType="danger">normal</Button>
			<Button size="sm">small</Button>
		</div>
	);
}

export default App;
