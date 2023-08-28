import './App.css';
import web3 from './web3';
import lottery from './lottery';
import React from "react";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
  };

  async componentDidMount() {
    const [manager, players, balance] = await Promise.all([
      lottery.methods.manager().call(),
      lottery.methods.getPlayers().call(),
      web3.eth.getBalance(lottery.options.address)
    ]);
    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          The contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
      </div>
    );
  }
}
export default App;