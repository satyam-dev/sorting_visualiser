import * as React from "react";
import { AlgoEnum } from "../enums/algoEnums";

export interface HeaderProps {
  onActivate: any;
  onChange: Function;
  algorithms: AlgoEnum[];
  selectedAlgo: AlgoEnum;
}

class Header extends React.Component<HeaderProps, {}> {
  handleChange = (option: string) => {
    this.setState({ selectedAlgorithm: option });
    this.props.onChange(option);
  };
  render() {
    const { selectedAlgo, algorithms, onActivate } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Sorting Visualiser</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <button className="btn btn-dark mr-2" onClick={onActivate}>
            Activate
          </button>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle mr-4"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {selectedAlgo}
                </button>
                <div
                  className="dropdown-menu action-link"
                  aria-labelledby="dropdownMenuButton"
                >
                  {algorithms.map((algo) => (
                    <div
                      key={algo}
                      onClick={() => this.handleChange(algo)}
                      className="dropdown-item"
                    >
                      {algo}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
