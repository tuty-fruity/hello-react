import * as React from 'react';
import './App.css';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

const logo = require('./logo.svg');

enableRipple(true);

interface CustomItem {
    id: string;
    title: string;
    body: string;
}

class SampleComponent extends React.Component<{items: Array<CustomItem>}, {}> {
    render() {
        return (
            <ul list-style-type="circle" >
                {this.props.items.map((item) => (
                    [
                    <li key={item.id}>{item.title}</li>,
                    <li key={item.id}>{item.body}</li> 
                    ]
                ))}
            </ul>
        );
    }
}

class App extends React.Component<{}, {items: Array<CustomItem>}> {

    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        };

        this.fetchme = this.fetchme.bind(this);
    }

    update(json: CustomItem): void {
        this.setState({
            items: [{
                'id': json.id,
                'title': json.title,
                'body': json.body
            }]
        }); 
    }

    fetchme(): void {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            this.update(json);
        });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">This is not a Welcome Message!</h1>
            </header>
            <p className="App-intro">
                <ButtonComponent cssClass="e-outline" content="Test Button" onClick={this.fetchme as any}/>
             </p>
             <SampleComponent items={this.state.items} />
          </div>
        );
    }
}

export default App;
