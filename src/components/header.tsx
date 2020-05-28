import * as React from "react";
export interface HeaderProps {
  //   onChange: Function;
}

export interface HeaderState {
  algorithms: string[];
  selectedAlgorithm: string;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    algorithms: ["Bubble Sort", "Insertion Sort", "Merge Sort"],
    selectedAlgorithm: "Insertion Sort",
  };

  handleChange = (option: string) => {
    this.setState({ selectedAlgorithm: option });
    // this.props.onChange(option);
  };

  render() {
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
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.selectedAlgorithm}
                </button>
                <div
                  className="dropdown-menu action-link"
                  aria-labelledby="dropdownMenuButton"
                >
                  {this.state.algorithms.map((algo) => (
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
